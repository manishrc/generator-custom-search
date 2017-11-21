'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the rad ' + chalk.red('generator-custom-search') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'title',
        message: 'What do you want to name it?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe what site is about:',
        default: 'A Customer Search Engine'
      },
      {
        type: 'input',
        name: 'cse_id',
        message: 'What is the Google CSE ID?',
      },
      {
        type: 'input',
        name: 'examples',
        message: 'What are some examples of search terms? (Comma seperated)',
      },
      {
        type: 'input',
        name: 'ga_id',
        message: 'What is the Google Analytics ID?',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      if (props.examples){
        props.examples = props.examples.split(',').map((x) => x.trim())
        console.log(props.examples)
      }
      this.props = props;
    });
  }

  writing() {
    var options = {
        title: this.props.title,
        description: this.props.description,
        cse_id: this.props.cse_id,
        examples: this.props.examples,
        ga_id: this.props.ga_id
      }

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      options
    );

    this.fs.copyTpl(
      this.templatePath('search.html'),
      this.destinationPath('search.html'),
      options
    );

    this.fs.copy(
      this.templatePath('./stylesheets/'),
      this.destinationPath('./stylesheets/')
    )
  }

  install() {
    this.installDependencies();
  }
};
