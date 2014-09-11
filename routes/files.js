/**
 * Module dependencies.
 */
var files = require('./../controllers/files');


/**
 *  文档
 */
module.exports = function(app, auth) {

    //获取文档列表
    app.get('/files/:projectID', auth.needToLogin, files.list);

    //新建文档
    app.post('/files/:projectID', files.create);

    //编辑文档
    app.put('/files/:fileID', files.update);

    //删除文档
    app.delete('/files/:fileID', files.del);

    //查看文档
    app.get('/viewfile/:fileID', auth.needToLogin, files.view);

    //编写文档-获取文档内容
    app.get('/editfile/:fileID', auth.needToLogin, files.fileContent);

    //修改文档内容
    app.put('/editfile/:fileID', files.edit);
}
