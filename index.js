// cron
var schedule = require("node-schedule");
// xmlパーサー
var parseString = require('xml2js').parseString;
// GET
var request = require('request');
var options = {url: 'http://www.drk7.jp/weather/xml/13.xml'};
// mail
var mailer = require('nodemailer');


// 送信側アドレス・パスワード& 受信側アドレス
var mailconf = require('./config');


var fromaddress = mailconf.fromaddress();
var frompass = mailconf.frompass();
var toaddress = mailconf.toaddress();


function sendMail(){
	var smtpTransport = mailer.createTransport("Gmail",{
		auth: {
			user: fromaddress,
			pass: frompass
		}
	});

	var mail = {
		from: "node <"+ fromaddress +">",
		to: toaddress,
		subject: "今日は雨が降ります!",
		html: "傘を持って行きましょう!!"
	};

	smtpTransport.sendMail(mail, function(error, response){
		if(error){
			console.log(error);
		}else{
			console.log("Message sent: " + response.message);
		}

		smtpTransport.close();
	});
}



// 現在の東京の降水確率を取得
function getRainfall(){
	request.get(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			parseString(body, function (err, result) {
				var tokyo = result.weatherforecast.pref[0].area[3];
				
				// 今日の降水確率
				var rainfall = tokyo.info[0].rainfallchance[0].period;
				// 12-18時の降水確率
				var afternoon = ~~(rainfall[2]._);
				// 18-24時の降水確率
				var night = ~~(rainfall[3]._);

				if(afternoon > 60 || rainfall > 60){
					//console.log("降るかも");
					sendMail();
				}else {
					//console.log("大丈夫そう");
					return;
				}
			});
		} else {
			console.log('error: '+ response.statusCode);
		}
	});
}


var job = schedule.scheduleJob({
	hour   : 7
//	second: 40
}, function () {
	console.log(getRainfall());
	console.log("hoge");
});

/**/
