// 这是我们的玩家要躲避的敌人 
var Enemy = function (x,y,spend) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.spend = spend;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x + this.spend;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(this.x > 606)
    {
        this.x = -83;
    }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 303;
    this.y = 400;
}
Player.prototype.handleInput = function (direction) {
    var tmp_x = this.x;
    var tmp_y = this.y;
    var node_action = {
        'left': function () {
            tmp_x = tmp_x - 101;
        },
        'up': function () {
            tmp_y = tmp_y - 83;
        },
        'right': function () {
            tmp_x = tmp_x + 101;
        },
        'down': function () {
            tmp_y = tmp_y + 83;
        }
    };
    if(typeof node_action[direction] == 'function'){
        node_action[direction]();
    }else{
        return;//不是函数就结束
    };//直接设置看看有没有问题
    //设置边界
    var border = {
        'left': 0,
        'up': -15,
        'right': 404,
        'down': 400
    }
    //防止游戏玩家跑出
    if(tmp_x >= border.right){
        tmp_x = border.right;
    }
    if(tmp_x <= border.left){
        tmp_x = border.left;
    }
    if(tmp_y >= border.down){
        tmp_y = border.down;
    }
    if(tmp_y <= border.up){
        tmp_y = border.up;
    }
    this.x = tmp_x;
    this.y = tmp_y;
}
Player.prototype.update = function (dt) {
    // this.x = x;
    // this.y = y;
}
//玩家的渲染居然一直在进行！！！！完全没有必要呀！
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x,this.y);
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var player = new Player();
var allEnemies = [new Enemy(-80,50,3), new Enemy(-20,120,2)];

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
