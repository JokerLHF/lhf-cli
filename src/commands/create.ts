import ora from 'ora';
import chalk from 'chalk';
import handlebars from 'handlebars'
import inquirer from 'inquirer'
import execa from 'execa'
import downloadGit from 'git-clone/promise';

const path = require("path");
const fse = require('fs-extra');

const spinner = ora();

export const startSpinner = (text?: string) => {
  const msg = `${text}...\n`
  spinner.start(msg)
  spinner.stopAndPersist({
    symbol: '✨',
    text: msg,
  })
}

export const getQuestions = async (projectName: string) => {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `package name: (${projectName})`,
      default: projectName,
    },
    {
      type: 'input',
      name: 'description',
      message: 'description',
    },
    {
      type: 'input',
      name: 'author',
      message: 'author',
    },
  ])
}

// 检查是否已经存在相同名字工程
export const checkProjectExist = async (targetDir: string) => {
  if (fse.existsSync(targetDir)) {
    const answer = await inquirer.prompt({
      type: 'list',
      name: 'checkExist',
      message: `\n仓库路径${targetDir}已存在，请选择`,
      choices: ['覆盖', '取消'],
    })
    if (answer.checkExist === '覆盖') {
      console.log(chalk.yellow(`\n删除${targetDir}...\n`))
      fse.removeSync(targetDir);
      return false;
    }
    return true;
  }
  return false
}

// 远程仓库 url
const getRepoUrl = () => {
  return 'https://github.com/JokerLHF/react-template.git';
}

const cloneProject = async (targetDir: string, projectInfo: any) => {
  try {
    startSpinner(`开始创建私服仓库 ${chalk.green(targetDir)}...`);
    await downloadGit(getRepoUrl(), targetDir);

    // handlebars模版引擎解析用户输入的信息存在package.json
    const jsonPath = `${targetDir}/package.json`;
    const jsonContent = fse.readFileSync(jsonPath, 'utf-8');
    const jsonResult = handlebars.compile(jsonContent)(projectInfo);
    fse.writeFileSync(jsonPath, jsonResult);

    // 新建工程装包
    execa.commandSync('npm install', {
      stdio: 'inherit',
      cwd: targetDir,
    });

    startSpinner(`创建成功 ${chalk.green(targetDir)}`);
  } catch(err) {
    startSpinner(chalk.red("创建私服仓库失败"));
    console.log('err');
  }
}

const createAction = async (projectName: string) => {
  const targetDir = path.join(process.cwd(), projectName);

  if (!(await checkProjectExist(targetDir))) {
    const projectInfo = await getQuestions(projectName);
    await cloneProject(targetDir, projectInfo)
  }
};


export default createAction;