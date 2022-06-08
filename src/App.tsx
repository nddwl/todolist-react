import React from 'react';
import './App.css'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <ToDoMvc/>
            </header>
        </div>
    );
}
class ToDoMvc extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        //新增
        this.Create = this.Create.bind(this);
        //
        this.List = this.List.bind(this);
        //状态
        this.ToDo = this.ToDo.bind(this);
        //删除
        this.Delete = this.Delete.bind(this);
        //查找其唯一id
        this.FindId = this.FindId.bind(this);
        //
        this.DeleteAll = this.DeleteAll.bind(this);
        //
        this.state = {tasks:[],num:0,hasOk:0};
    }
    Create(event:any){
        if (event.key==='Enter'){
            let obj = {num:this.state.num+1,tasks:[...this.state.tasks,{id:this.state.num+1,name:event.target.value,done:false}]};
            this.setState(obj);
            event.target.value=null;
        }
    }
    FindId(event:any){
        const id = event.target.id;

        let tasks=this.state.tasks;
        let i=0;

        for(i;i<tasks.length;i++){
            if(tasks[i].id===Number(id)){
                return i;
            }
        }
        return -1;
    }
    Delete(event:any){
        let  num = this.state.num-1;
        let tasks=this.state.tasks;
        let i=this.FindId(event);

        if(tasks[i].done){
            let hasOk = this.state.hasOk-1;
            if(hasOk<0){
                hasOk=0;
            }
            this.setState({hasOk:hasOk});
        }
        tasks.splice(i,1);
        this.setState({num:num,tasks:tasks});
    }
    DeleteAll(event:any){
        const checked = event.target.checked
        const id = Number(event.target.id)

        let tasks = []
        let num  = this.state.num
        let hasOk = this.state.hasOk
        let length = this.state.tasks.length

        if (checked){
            if(id===1){
                this.setState({num:0,hasOk:0,tasks:[]})
            }else {
                for(let i=0;i<length;i++){
                    if (!this.state.tasks[i].done){
                        tasks.push(this.state.tasks[i])
                    }
                }
                num = num-hasOk
                hasOk=0
                this.setState({tasks:tasks,num:num,hasOk:hasOk})
            }
        }
        event.target.checked=false
    }
    ToDo(event:any){
        let i=this.FindId(event);
        let hasOk = this.state.hasOk;
        let tasks = this.state.tasks;

        if(event.target.checked){
            tasks[i].done = true;
            this.setState({hasOk:hasOk+1,tasks:tasks});
        }else{
            tasks[i].done = false;
            if(hasOk<0){
                hasOk=0;
            }
            this.setState({hasOk:hasOk-1,tasks:tasks});
        }
    }
    List(state:any){
        return state.tasks.map((obj:any)=>{return <li key={obj.id}><input type='checkbox' id={obj.id}
            onClick={this.ToDo}/>{obj.name}<input type='checkbox' id={obj.id} onClick={this.Delete}/></li>});

    }
    render(){
        return(
            <div>
                <p className="App-todos">todos</p>
                <li>清空：<input id='1' type='checkbox' onClick={this.DeleteAll}/></li>
                <li>清空已完成<input id='2' type='checkbox' onClick={this.DeleteAll}/></li>
                <input onKeyDown={this.Create}/>
                {this.List(this.state)}
                <li>{this.state.hasOk}/{this.state.num}</li>
            </div>
        );
    }
}
export default App