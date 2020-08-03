module.exports = {
    name: 'yarn-up-all-plugin',
    factory: require => {

        const {Configuration, Project} = require('@yarnpkg/core');
        const {Cli, Command} = require('clipanion');
        const yup = require('yup');
        const Essentials = require('@yarnpkg/plugin-essentials');

        /**
         * Retrieve dependencies and devDependencies
         * @param workspace The current Workspace
         * @returns {*[]} an array of dependencies
         */
        const getDependencies = (workspace) => {
            const dependencies = workspace.manifest.dependencies;
            const devDependencies = workspace.manifest.devDependencies;

            return [...dependencies, ...devDependencies];
        };

        /**
         * Resolve the name of a package
         * @param scope The scope of the descriptor
         * @param name The name of the descriptor
         * @returns {string|*} The full package name
         */
        const resolveFullPackageName = (scope, name) => {
            return scope ? `@${scope}/${name}` : name;
        };

        /**
         * Get the descriptor
         * @param dependencies The dependencies
         * @param exclude The list of full package names that should be excluded
         * @returns {*[]} The descriptors
         */
        const getDescriptors = (dependencies, exclude) => {
            const descriptions = [...dependencies.values()];
            if (exclude) {
                return descriptions
                    .filter(descriptor => {
                        const data = resolveFullPackageName(descriptor[1].scope, descriptor[1].name);
                        return !exclude.includes(data);
                    });
            }
            return descriptions;
        };

        class UpAllCommand extends Command {

            /**
             * Execute the command
             * @returns {Promise<*>}
             */
            async execute() {
                if (!Essentials.default.commands) {
                    throw new Error('Yarn commands are not available!');
                }

                const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
                const {workspace} = await Project.find(configuration, this.context.cwd);

                const dependencies = getDependencies(workspace);
                const descriptors = getDescriptors(dependencies, this.exclude ? this.exclude.split(" ") : null);

                const packageNames = descriptors.map(e => {
                    return resolveFullPackageName(e[1].scope, e[1].name);
                });

                const cli = Cli.from(Essentials.default.commands);
                return await cli.runExit(['up', ...packageNames], this.context);
            }
        }

        UpAllCommand.addOption('exclude', Command.String('--exclude'));
        UpAllCommand.addPath('up-all');

        UpAllCommand.schema = yup.object().shape({
            exclude: yup.string()
        });

        UpAllCommand.usage = Command.Usage({
            description: 'Yarn2 plugin that will upgrade all dependencies to their latest version with one simple command',
            details: 'This command will upgrade all dependencies to their latest version',
            examples: [
                [
                    `Upgrade all dependencies`,
                    `yarn up-all`
                ],
                [
                    `Upgrade all dependencies but exclude a single dependency`,
                    `yarn up-all --exclude react-dom`
                ],
                [
                    `Upgrade all dependencies but exclude multiple dependencies`,
                    `yarn up-all --exclude "react-dom react-router"`
                ]]
        });

        return {
            commands: [
                UpAllCommand,
            ],
        };
    }
};
