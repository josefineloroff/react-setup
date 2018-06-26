const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
const handlebars = require('handlebars');
const untildify = require('untildify');
const projectFiles = require('./react-setup/files');

const schema = {
    properties: {
        directory: {
            description: 'Project directory',
            type: 'string',
            required: true,
        },
        title: {
            description: 'Project title',
            type: 'string',
            required: true,
        },
        webpackPort: {
            description: 'Webpack dev server port',
            type: 'number',
            required: true,
        },
        redux: {
            description: 'Include redux? (y/n)',
            type: 'string',
            pattern: /^(y|n){1}$/,
            required: true,
        },
        router: {
            description: 'Include react-router? (y/n)',
            type: 'string',
            pattern: /^(y|n){1}$/,
            required: true,
        },
        server: {
            description: 'Include express server? (y/n)',
            type: 'string',
            pattern: /^(y|n){1}$/,
            required: true,
        },
    },
};

prompt.start();

prompt.get(schema, (error, result) => {
    const userDirectory = untildify(result.directory);
    const projectRoot = path.join(__dirname, 'project');

    const createFiles = (files, directory = '') => {
        try {
            fs.mkdirSync(path.join(userDirectory, directory));
        } catch (_) {
            // Directory already exists
        }

        files.forEach((file) => {
            if (!file.onlyIf || result[file.onlyIf] === 'y') {
                if (file.children) {
                    createFiles(file.children, path.join(directory, file.name));
                } else {
                    file = typeof file === 'string' ? file : file.name;

                    const content = fs.readFileSync(path.join(projectRoot, directory, file));

                    fs.writeFileSync(
                        path.join(userDirectory, directory, file),
                        handlebars.compile(content.toString('utf8'))({
                            redux: result.redux === 'y',
                            router: result.router === 'y',
                            server: result.server === 'y',
                            title: result.title,
                            webpackPort: result.webpackPort,
                        })
                    );
                }
            }
        });
    };

    createFiles(projectFiles);
});
