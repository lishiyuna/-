<template>
	<div class="content">
		<router-link to="lbtadd">
			<el-button type="primary" style="margin: 20px">添加轮播图</el-button>
		</router-link>
		<el-table :data="tableData" stripe style="width: 100%">
			<el-table-column prop="id" label="Id" />
			<el-table-column prop="name" label="Name" />
			<el-table-column prop="img" label="img">
				<template v-slot="scope">
					<el-image v-if="scope.row.img" :src="scope.row.img" :preview-src-list="imgList" fit="cover"
						style="width: 180px" :preview-teleported="true" :hide-on-click-modal="true" />
				</template>
			</el-table-column>
			<el-table-column prop="address" label="操作" width="200" align="center">
				<template v-slot="scope">
					<router-link :to="'/lbtedit/' + scope.row.id">
						<el-button type="primary" icon="Edit" size="small" @click="handleEdit(scope.row.id)" />
					</router-link>
					<el-button class="delBtn" @click="handleDelete(scope.row.id)" type="danger" icon="Delete"
						size="small" />
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup>
	import {
		getLbt,
		deleteLbt
	} from "@/api/lbt";
	import {
		ElMessage
	} from "element-plus";
	import {
		ref
	} from "vue";

	const tableData = ref(null);
	const imgList = ref([]);
	async function getlist() {
		let res = await getLbt();
		tableData.value = res.records;
		console.log(tableData.value);
	
		res.records.forEach((item) => {
			imgList.value.push(item.img);
		});
		console.log(tableData.value);
		console.log(imgList.value);
	}
	getlist();

	// function handleEdit() {}
	function handleDelete(id) {
		ElMessageBox.confirm("此操作将删除该图片, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
			.then(async () => {
				try {
					console.log(id);
					let res = await deleteLbt(id);
					if (res.code == 1) {
						ElMessage({
							showClose: true,
							message: res.msg,
							type: "success",
						});
					}
					getlist();
					// tableData.value = res.records;
				} catch (error) {
					console.log(error);
				}
			})
			.catch(() => {
				ElMessage.info({
					message: "已取消删除",
				});
			});
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100vh;
	}

	a {
		text-decoration: none;
	}

	.delBtn {
		margin-left: 10px;
	}
</style>
