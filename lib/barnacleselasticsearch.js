/**
 * Copyright reelyActive 2019
 * Copyright Benjamin Girault 2019
 * SPDX-License-Identifier: (MIT AND GPL-2.0-only)
 */


const { Client } = require('@elastic/elasticsearch');
const Raddec = require('raddec');


const DEFAULT_ELASTICSEARCH_NODE = 'http://localhost:9200';
const DEFAULT_INDEX = 'raddec';
const DEFAULT_MAPPING_TYPE = '_doc';
const DEFAULT_PRINT_ERRORS = true;
const DEFAULT_RADDEC_OPTIONS = { includePackets: false };
const DEFAULT_BULK_SIZE = 100;


/**
 * BarnaclesElasticsearch Class
 * Detects events and writes to Elasticsearch.
 */
class BarnaclesElasticsearch {

  /**
   * BarnaclesElasticsearch constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    let self = this;
    options = options || {};

    // Fallback for previous Elasticsearch client
    if(options.host && !options.node) {
      options.node = 'http://' + options.host;
    }

    this.node = options.node || DEFAULT_ELASTICSEARCH_NODE;
    this.index = options.index || DEFAULT_INDEX;
    this.mappingType = options.mappingType || DEFAULT_MAPPING_TYPE;
    this.printErrors = options.printErrors || DEFAULT_PRINT_ERRORS;
    this.raddecOptions = options.raddec || DEFAULT_RADDEC_OPTIONS;
    this.esBulkSize = options.esBulkSize || DEFAULT_BULK_SIZE;
    
    this.esRaddecs = []

    if(options.client) {
      this.client = options.client;
    }
    else {
      this.client = new Client({ node: self.node });
    }
    
  }

  /**
   * Handle an outbound raddec.
   * @param {Raddec} raddec The outbound raddec.
   */
  handleRaddec(raddec) {
    let self = this;
    let id = raddec.timestamp + '-' + raddec.transmitterId + '-' +
             raddec.transmitterIdType;

    // Create flat raddec and tweak properties for Elasticsearch
    let esRaddec = raddec.toFlattened(self.raddecOptions);
    esRaddec.timestamp = new Date(esRaddec.timestamp).toISOString();

    // Queue the raddec for later upload
    this.esRaddecs.push({ index: { _index: this.index, _id: id } });
    this.esRaddecs.push(esRaddec);
    
    // Perform the upload if enough are in the queue
    if (this.esRaddecs.length >= 2 * this.esBulkSize) {
      this.sendData();
    }
  }
  
  /**
   * Upload raddecs to ElasticSearch
   */
  sendData() {
    let self = this;
    if (this.printErrors) {
      this.client.bulk({ body: self.esRaddecs }, (err, response) => {
        if(err) {
          console.log('barnacles-elasticsearch error:', err);
          console.log(err.meta.body.error);
          return;
        }
        if (response.body.items.errors) {
          response.body.items.forEach(item => {
            if (item.index && item.index.error) {
              console.log('barnacles-elasticsearch item error:', item.index.error);
            }
          });
        }
      });
    } else {
      this.client.bulk({ body: self.esRaddecs });
    }
    this.esRaddecs = [];
  }
}


module.exports = BarnaclesElasticsearch;
