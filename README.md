# egg-tamplate


除了用户角色权限系统 还有其他接口功能实现，可自行体验

### 1. 启动之前的配置

 - config.default 配置

    ```javascript
        // 配置数据库
        config.sequelize = {}
    ```
- 配置 database 生成数据库 

    ```javascript
    // 1. 配置 database/config.json
    // 2 执行 npx sequelize db:migrate
    npx sequelize db:migrate
    ```

### 2.实现用户角色权限系统

```javascript
    // controller 控制器
    // 登录
    controller.admin.user.login
    // 获取用户信息
    controller.admin.user.info
    // 编辑用户权限
    controller.admin.role.update

```


### 3.启动

```javascript

npm run dev

```

### 创建数据库模型

-   npx sequelize migration:generate --name=create-xxxx
-   npx sequelize migration:generate --name=update-xxxx
-   npx sequelize db:migrate
```javascript

// xxx.destroy({ force: true }) { force: true } 强行删除

up: async (queryInterface, Sequelize) => {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
        const { STRING } = Sequelize
        return queryInterface.addColumn('my_permission', 'uri', {
            type: STRING(200),
            comment: '唯一权限',
            unique: true,
            after: 'name',
        })
    },

```
