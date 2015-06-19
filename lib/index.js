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

var Knex = require('knex');

module.exports = function setup(options, imports, register) {
    
    if (!options || !options.settings || options.settings.length === 0) {
        register(new Error("No settings found"));
    }
    
    var instances = Object.keys(options.settings).reduce(function (prev, curr) {
        prev[curr] = new Knex(options.settings[curr]);
        return prev;
    }, {});

    register(null, {
        onDestroy: function (callback) {
            Object.keys(instances).forEach(function(key) {
                if(typeof instances[key] === 'object') {
                    instances[key].destroy();
                }
            });
            callback();
        },
        knex: instances
    });
};
