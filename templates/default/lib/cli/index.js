
var program = require('commander');
var util = require('util');
var path = require('path');
var table = require('cli-table-zh');
var colors = require('colors');

/**
 * list sth info 
 */
program
.command('list [sth]')
.description('List something info')
.action(function(sth) {
    var self = this;
    var apps_table = new table( {
            head:['First', 'Second'],
            style: { head:['cyan']}
    });
    apps_table.push(['First line', 'Info']); 
    apps_table.push(['Second line', 'Info']);
    apps_table.push(['我是第三行','我是信息']);
    if(sth){
        apps_table.push([sth, 'Info of '+sth]);
    }
    console.log(apps_table.toString());
});

program
.command('add <file>')
.description('add file')
.action(function(file) {
    file = path.resolve(process.cwd(), file);
    console.log('File path:'.green, file);
    console.log('Succeed to add.'.green);
    console.log(('Failed to add. ' + 'Error info...' ).red);
});

program
.command('*')
.action(function() { program.help(); } );


program
.version('0.0.2')
.option('-a,--all', 'show all')
;

module.exports = program;


