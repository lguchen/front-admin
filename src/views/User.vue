<template>
    <div style="padding:10px">
        <div style="padding:10px">
            <el-input style="width:250px" suffix-icon="el-icon-search" placeholder="请输入用户名搜索"
                v-model="username"></el-input>

            <el-input style="width:250px" suffix-icon="el-icon-email" placeholder="请输入邮箱搜索" v-model="email"></el-input>
            <el-input style="width:250px" suffix-icon="el-icon-position" placeholder="请输入地址搜索" v-model="address"></el-input>
            <el-button style="margin-left:5px" type="primary" @click="load">搜索</el-button>
            <el-button style="margin-left:5px" type="warning" @click="reset">重置</el-button>

        </div>
        <div style="margin:10px">
            <el-button type="primary" @click="hanleAdd">新增<i class="el-icon-circle-plus"></i></el-button>
            <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
                <el-form label-width="80px" size="small">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username" autocomplete="off" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-select clearable v-model="form.role" placeholder="请选择角色" style="width: 100%;">
                            <el-option v-for="item in roles" :key="item.name" :label="item.name"
                                :value="item.flag"></el-option></el-select>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="form.nickname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="form.address" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="insert">确 定</el-button>
                </div>
            </el-dialog>
            <el-popconfirm title="确认删除选中的内容？" @confirm="delBatch">
                <el-button type="danger" slot="reference">批量删除<i class="el-icon-remove"></i></el-button>
            </el-popconfirm>
            <el-upload action="http://localhost:8081/user/import" :show-file-list="false" accept="xlsx"
                :on-success="upload" style="display: inline-block;">
                <el-button type="primary">导入<i class="el-icon-bottom"></i></el-button>
            </el-upload>
            <el-button type="primary" @click="exp">导出<i class="el-icon-top"></i></el-button>
        </div>
        <el-table :data="tableData" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID " width="80">
            </el-table-column>
            <el-table-column prop="role" label="角色" width="115">
            </el-table-column>
            <el-table-column prop="username" label="用户名 " width="100">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="220">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="250">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="240">
                <template slot-scope="scope">
                    <el-button type="success" size="small" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
                    <el-popconfirm title="确定要删除吗?" @confirm="handleDelete(scope.row.id)">
                        <el-button type="danger" slot="reference" size="small" icon="el-icon-delete">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding:10px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>

export default {
    name: "User",
    data() {
        return {
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 20,
            username: "",
            // nickname: "",
            email:"",
            address: "",
            
            dialogFormVisible: false,
            form: {},
            multipleSelection: [],
            roles:""
        }
    },
    created() {
        //请求分页查询数据
        this.load();
    },
    methods: {
        edit(row) {
            console.log(row);
            this.form = row;
            this.dialogFormVisible = true;
        },
        handleSizeChange(val) {/*传递过来当前是第几页*/
            console.log(`每页 ${val} 条`);
            this.pageSize = val;  //获取当前每页显示条数
            this.load();
        },
        handleCurrentChange(val) {/*传递过来当前是第几页*/
            console.log(`当前页: ${val}`);
            this.pageNum = val;   //获取当前第几页
            this.load();
        },
        //将请求数据封装为一个方法
        // 跨域时将userName参数也传递过去，修改load方法。
        load() {
            //请求分页查询数据
            //fetch("http://localhost:8084/user/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"").then(res=>res.json()).then(res=>{
            //使用axios封装的request        
            this.request.get("/user/page", {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    username: this.username,
                    email: this.email,
                    address: this.address
                }
            }).then(res => {
                console.log(res)
                this.tableData = res.records;
                this.total = res.total;
            })
            this.request.get("/role").then(res => {
                this.roles = res.data
            })
        },
        reset() {
            this.username = "";
            this.email = "";
            this.address = "";
            this.load();
        },

        hanleAdd() {
            this.dialogFormVisible = true;
            this.form = {};
        },
        handleDelete(id) {
            this.request.delete("/user/" + id + "").then(res => {
                if (res) {
                    this.$message.success("删除成功");
                    this.load()
                } else {
                    this.$message.info("已取消删除");
                }
            })

        },
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
        },
        delBatch() {
            let ids = this.multipleSelection.map(v => v.id);//map这个方法可以实现将multipleSelection中的对象扁平化处理。
            console.log(ids);
            this.request.post("/user/del/batch", ids).then(res => {
                if (res) {
                    this.$message.success("删除成功")
                    this.load()
                } else {
                    this.$message.info("已取消")
                }
            })
        },
        insert() {
            // this.form.password = "12345"
            this.request.post("/user", this.form).then(res => {
                if (res) {
                    this.$message.success("保存成功");
                    this.dialogFormVisible = false;
                    this.load();
                } else {
                    this.$message.error("保存失败");
                }
            })
        },
        exp() {
            window.open("http://localhost:8081/user/export")
        },
        upload() {
            this.$message.success("导入成功");
            this.load()
        }

    },

}

</script>