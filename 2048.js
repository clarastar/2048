var game={
	data:null,
	RN:8,
	CN:8,
	score:0,
	state:1,
	RUNNING:1,
	GAMEOVER:0,
	CSIZE:100,
	OFFSET:16,


	int:function(){
		for(var r=0,arr=[];r<this.RN;r++)
			for(var c=0;c<this.CN;c++)
				arr.push(""+r+c);

		var html=
			'<div id="g'+
			arr.join('" class="grid"></div><div id="g')
			+'" class="grid"></div>';
		html+=
			'<div id="c'+
			arr.join('" class="cell"></div><div id="c')
			+'" class="cell"></div>';

		var gp=document.getElementById("gridPanel");
		gp.innerHTML=html;

		var width=this.CN*(this.CSIZE+this.OFFSET)
            +this.OFFSET;
  		var height=this.RN*(this.CSIZE+this.OFFSET)
            +this.OFFSET;
   		gp.style.width=width+"px";
   		gp.style.height=height+"px";
	},
	
	start:function(){//启动游戏
		//创建空数组保存到data属性中
		this.int();
		this.data=[];
		this.score=0;
		this.state=this.RUNNING;
		for(var r=0;r<this.RN;r++){//?????
			this.data.push([]);
			for(var c=0;c<this.CN;c++){
				this.data[r].push(0);
			}
		}
		this.randomNum();
		this.randomNum();
		this.randomNum();
		this.randomNum();

		this.updateView();
		//为页面绑定键盘按下
		document.onkeydown=function(e){
			//获得按键编号
			switch(e.keyCode){
			case 37:this.moveLeft();break;
			case 38:this.moveUp();break;
			case 39:this.moveRight();break;
			case 40:this.moveDown();break;	
			}
		}.bind(this);
	},

	randomNum:function(){
		while(true){
			var r=Math.floor(Math.random()*this.RN);
			var c=Math.floor(Math.random()*this.CN);
			if(this.data[r][c]==0){
				this.data[r][c]=
					Math.random()<0.7?2:4;
				break;
			}
		}
	},

	updateView:function(){	
		for(var r=0;r<this.RN;r++){			
			for(var c=0;c<this.CN;c++){
				var div=document.getElementById("c"+r+c);
				//调试程序的两个方式：debugger  打桩
				if(this.data[r][c]!=0){
					div.innerHTML=this.data[r][c];	
					div.className="cell n"+this.data[r][c];
				}else{
					div.innerHTML="";	
					div.className="cell";
				}


			}
		}
		
	 document.getElementById("score").innerHTML=this.score;
		
	var gameOver=document.getElementById("gameOver");

		if(this.state==this.GAMEOVER){
				gameOver.style.display="block";
				document.getElementById("fScore").innerHTML=this.score;
		}else{
				gameOver.style.display="none";
		}

	},
	
	isGameOver:function(){
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				if(this.data[r][c]==0){
					return false;		
				} 
				if(c<this.CN-1&&this.data[r][c]==this.data[r][c+1]){
					return false;	
				}
				if(r<this.RN-1&&this.data[r][c]==this.data[r+1][c]){
					return false;	
				}
			}
		}
		return true;		
	},

	move:function(fun){
		var before=String(this.data);
		fun();//没有任何函数对象调用的函数，指向window??????
		var after=String(this.data);
		if (before!=after)
			{	
				this.randomNum();
					//游戏结束状态判断
					if(this.isGameOver()){//直接判断啊啊啊啊
						this.state=this.GAMEOVER;
					}
				this.updateView();	
			}
	},
	moveLeft:function(){//左移所有行
		//为data拍照保存在before
		//遍历data中每一行
		  //调用moveLeftInRow左移第r行
		//(遍历后)
		//为data拍照保存在after
		//如果before!=after
		  //调用randomNum随机生成一个数
		  //更新页面
		  //调用randomNum随机生成一个数
		  //更新页面

		this.move(function(){
			for(var r=0;r<this.RN;r++){
				this.moveLeftInRow(r);		
			}

		}.bind(this));
	},

	moveLeftInRow:function(r){//左移 r行
		for(var c=0;c<this.CN-1;c++){
			  var nextc=this.getNextInRow(r,c); //??????
			  if (nextc==-1) {break; }
			 else{
					if(this.data[r][c]==0){ 
						this.data[r][c]=this.data[r][nextc];
						this.data[r][nextc]=0;
					}
					else if(this.data[r][c]==this.data[r][nextc]){
								this.data[r][c]*=2;
								this.score+=this.data[r][c];
								this.data[r][nextc]=0;
					}				
			}
		}
	},

	getNextInRow:function(r,c){//
			for(var nextc=c+1;nextc<this.CN;nextc++)
			{
				if (this.data[r][nextc]!=0)
				{return nextc;}
			}
			return -1;
	},

	moveRight:function(){	  
		this.move(function(){
			for(var r=0;r<this.CN;r++){
				this.moveRightInRow(r);
			}
		}.bind(this));				
	},

	moveRightInRow:function(r){
		for(var c=this.CN-1;c>0;c--){
			var prevc=this.getPrevInRow(r,c); //??????
			if (prevc==-1) {break; }
			else {
					if(this.data[r][c]==0){ 
						this.data[r][c]=this.data[r][prevc];
						this.data[r][prevc]=0;
						//c++;
					}
					else if(this.data[r][c]==this.data[r][prevc]){
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[r][prevc]=0;
					}	
			}
		}
	},

	getPrevInRow:function(r,c){
			for(var prevc=c-1;prevc>=0;prevc--){
				if (this.data[r][prevc]!=0){
					return prevc;
				}
			}
			return -1;
	},

	moveUp:function(){
		this.move(function(){
			for(var c=0;c<this.CN;c++){
				this.moveUpInCol(c);		
			}
		}.bind(this));					
	},

	moveUpInCol:function(c){
		for(var r=0;r<this.RN-1;r++){
			var nextr=this.getNextInCol(r,c); //??????
			if (nextr==-1) {break; }
			else{
					if(this.data[r][c]==0){ 
						this.data[r][c]=this.data[nextr][c];
						this.data[nextr][c]=0;
					}
					else if(this.data[r][c]==this.data[nextr][c]){
						this.data[r][c]*=2;
						this.score+=this.data[r][c];
						this.data[nextr][c]=0;
						r--;
					}				
			}
		}
	},

	getNextInCol:function(r,c){
			for(var nextr=r+1;nextr<this.RN;nextr++){
				if (this.data[nextr][c]!=0)
				{return nextr;}
			}
			return -1;
	},

	moveDown:function(){
		this.move(function(){
			for(var c=0;c<this.RN;c++){
				this.moveDownInCol(c);
			}
		}.bind(this));				
	},

	moveDownInCol:function(c){
		for(var r=this.RN-1;r>0;r--){
			var prevr=this.getPrevInCol(r,c); //??????
			if (prevr==-1) {break; }
			else {
					if(this.data[r][c]==0){ 
						this.data[r][c]=this.data[prevr][c];
						this.data[prevr][c]=0;
						r++;
					}
					else if(this.data[r][c]==this.data[prevr][c]){
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[prevr][c]=0;
					}	
			}
		}
	},

	getPrevInCol:function(r,c){
			for(var prevr=r-1;prevr>=0;prevr--){
				if (this.data[prevr][c]!=0){
					return prevr;
				}
			}
			return -1;
	}

}



//页面加载后，自动启动游戏
window.onload=function(){
	game.start();
}