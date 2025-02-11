barnacles-elasticsearch
=======================

[Elasticsearch](https://www.elastic.co/products/elasticsearch) interface for [barnacles](https://github.com/reelyactive/barnacles/) open source software.  We believe in an open Internet of Things.

Installation
------------

    npm install barnacles-elasticsearch


Hello barnacles-elasticsearch
-----------------------------

The following code will write _simulated_ [raddec](https://github.com/reelyactive/raddec/) data to Elasticsearch running a local server (default port 9200).  The simulated data is provided by [barnowl](https://github.com/reelyactive/barnowl/) which is typically run in conjunction with [barnacles](https://github.com/reelyactive/barnacles/).  Install the _barnowl_, _barnacles_ and _barnacles-elasticsearch_ packages using npm before running the code.

```javascript
const Barnowl = require('barnowl');
const Barnacles = require('barnacles');
const BarnaclesElasticsearch = require('barnacles-elasticsearch');

let barnowl = new Barnowl();
barnowl.addListener(Barnowl, {}, Barnowl.TestListener, {});

let barnacles = new Barnacles({ barnowl: barnowl });
barnacles.addInterface(BarnaclesElasticsearch, { /* See options below */ });
```


Options
-------

__barnacles-elasticsearch__ supports the following options:

| Property      | Default                   | Description                    | 
|:--------------|:--------------------------|:-------------------------------|
| node          | "http://localhost:9200"   | Elasticsearch node             |
| client        | null                      | An instantiated Elasticsearch client |
| printErrors   | true                      | Print errors to the console (for debug) |
| raddecOptions | { includePackets: false } | See [raddec](https://github.com/reelyactive/raddec/) toFlattened() options |
| index         | "raddec"                  | Elasticsearch index name       |
| esBulkSize    | 100                       | Number of raddecs sent at once to Elasticsearch cluster |

By default __barnacles-elasticsearch__ will connect and write to localhost:9200.


License
-------

SPDX-License-Identifier: (MIT AND GPL-2.0-only)

### bgirault-usc/barnacles-elasticsearch fork for bulk upload.

GPL v2

Copyright (C) 2019 Benjamin Girault - University of Southern California

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; version 2.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.




### reelyactive/barnacles-elasticsearch base repository code

MIT License

Copyright (c) 2019 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
