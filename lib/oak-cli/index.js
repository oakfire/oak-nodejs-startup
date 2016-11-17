"use strict";

const program = require('commander');
const util = require('util');
const path = require('path');
const table = require('cli-table-zh');
const colors = require('colors/safe');
const fs = require('fs');
const ncp = require('ncp').ncp;

/**
 * list sth info 
 */
program
.command('list [sth]')
.description('List something info testing')
.action(sth => {
    let apps_table = new table( {
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
.description('command testing')
.action( file => {
    file = path.resolve(process.cwd(), file);
    console.log(colors.green('File path:'), file);
    console.log(colors.green('Succeed to add.'));
    const err = new Error('some error info');
    console.log(colors.red(`Failed to add. err: ${err}`));
});

program
.command('new <project>')
.description('new a project in the current path')
.action( project => {
    fs.mkdirSync(project);
    const template_path = path.join(__dirname, '../../templates/default');
    ncp(template_path, project, (err) => {
        if(err){
            console.log(err.toString());
        }else{
            console.log(colors.green('Done!'));
        }
    });
});

program
.command('*')
.action( () => program.help() );

program
.version('0.0.7')
.option('-a,--all', 'show all')
;

module.exports = program;


