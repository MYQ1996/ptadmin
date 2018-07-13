 layui.use('table', function () {
 	var table = layui.table;
 	table.render({
 		elem: '#demoEvent',
 		url: CheckTableInterface + '?table=' + "Column",
 		cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
 			,
 		cols: [
 			[{
 				type: 'checkbox',
 				fixed: 'left'
 			}, {
 				field: 'id',
 				title: 'ID',
 				sort: true
 			}, {
 				field: 'Column',
 				edit: 'text',
 				title: '表名'
 			}, {
 				field: 'ColumnName',
 				edit: 'text',
 				title: '注释'
 			}, {
 				field: 'Columnid',
 				title: '表id'
 			}, {
 				fixed: 'right',
 				align: 'center',
 				toolbar: '#barDemo'
 			}]
 		],
 		id: 'demoEvent',
 		page: true,
 		height: 500
 	});




 	var $ = layui.jquery,
 		layer = layui.layer;
 	$(document).on('click', '#Add', function () {
		 location.hash = '/database/new-database/new-database';
 		// layer.prompt({
 		// 	title: '请填写表名',
 		// 	formType: 3
 		// }, function (Column, index) {
 		// 	layer.close(index);
 		// 	layer.prompt({
 		// 		title: '请填写表的注释',
 		// 		formType: 3
 		// 	}, function (ColumnName, index) {
 		// 		layer.close(index);
 		// 		// layer.msg('演示完毕！您的口令：' + Column + '<br>您最后写下了：' + ColumnName);

 		// 		$.ajax({
 		// 			type: "post",
 		// 			url: NewTable,
 		// 			data: {
 		// 				Column: Column,
 		// 				ColumnName: ColumnName
 		// 			},
 		// 			success: function (data) {
 		// 				console.log(data);
 		// 				if (data.flag == 1) {
 		// 					var createTable = function () {
 		// 						table.init('demoEvent', tableOptions); // table lay-filter
 		// 					};
 		// 				}
 		// 			}
 		// 		})


 		// 	});
 		// });

 	});

 	//监听单元格编辑
 	table.on('edit(demoEvent)', function (obj) {
 		var value = obj.value //得到修改后的值
 			,
 			data = obj.data //得到所在行所有键值
 			,
 			field = obj.field; //得到字段
 		layer.msg('[ID: ' + data.id + '] ' + field + ' 字段更改为：' + value);
 	});

 	//监听表格复选框选择
 	table.on('checkbox(demoEvent)', function (obj) {
 		console.log(obj)
 	});
 	//监听工具条
 	table.on('tool(demoEvent)', function (obj) {
 		var data = obj.data;
 		if (obj.event === 'detail') {
 			layer.msg('Column:' + data.Column);
 			sessionStorage.setItem('Columnid', data.Columnid);
 			sessionStorage.setItem('Column', data.Column);

 			location.href = 'http://localhost/admin#/component/database/';
 		} else if (obj.event === 'del') {
 			layer.confirm('真的删除行么', function (index) {
 				obj.del();
 				layer.close(index);
 				console.log(obj.data.Column);
 				$.ajax({
 					type: "post",
 					url: "http://localhost/admin/Column/deleTable",
 					data: {
 						Column: obj.data.Column
 					},
 					success: function (data) {
 						console.log(data);
 					}
 				})
 			});
 		} else if (obj.event === 'edit') {
 			// layer.alert('编辑行：<br>' + JSON.stringify(data))


 		}

 		if (obj.event === 'setColumn') {
 			layer.prompt({
 				formType: 2,
 				title: '修改 ID 为 [' + data.id + '] 的用户签名',
 				value: data.sign
 			}, function (value, index) {
 				layer.close(index);
 				//这里一般是发送修改的Ajax请求
 				//同步更新表格和缓存对应的值
 				obj.update({
 					sign: value
 				});
 			});
 		}
 	});

 	var $ = layui.$,
 		active = {
 			getCheckData: function () { //获取选中数据
 				var checkStatus = table.checkStatus('idTest'),
 					data = checkStatus.data;
 				layer.alert(JSON.stringify(data));
 			},
 			getCheckLength: function () { //获取选中数目
 				var checkStatus = table.checkStatus('idTest'),
 					data = checkStatus.data;
 				layer.msg('选中了：' + data.length + ' 个');
 			},
 			isAll: function () { //验证是否全选
 				var checkStatus = table.checkStatus('idTest');
 				layer.msg(checkStatus.isAll ? '全选' : '未全选')
 			}
 		};

 	$('.demoTable .layui-btn').on('click', function () {
 		var type = $(this).data('type');
 		active[type] ? active[type].call(this) : '';
 	});

 });