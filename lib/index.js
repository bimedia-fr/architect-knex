/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq: true,*/
/* 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var knex = require('knex');
var _ = require('lodash');

module.exports = function setup(options, imports, register) {
    
    if (!options || !options.settings || options.settings.length === 0) {
        register(new Error("No settings found"));
    }
    
    var instances = _.transform(options.settings, function(result, setting, key) {
        result[key] = new knex(setting);
    });

    register(null, {
        onDestruct: function (callback) {
            _.forEach(instances, function(instance) {
                instance.destroy();
            });
            callback();
        },
        knex: instances
    });
};
