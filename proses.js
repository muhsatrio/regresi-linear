$(document).ready(function() {
	var maxKotak=3;
	var sumX=0;
	var sumY=0;
	var x=0;
	var y=0;
	var sumxy=0;
	var sumx2=0;
	var sumy2=0;
	var valb=0;
	var valdy2=0;
	var valdb=0;
	var tk=0;
	var tk;
	var n,hasil1,hasil2;
	var valMaks=0;
	var ymaks=400,xmaks=400,tempX,tempY,posX,posY;

	//Make chart in canvas

	var canvas = document.getElementById("gambargrafik");
	var ctx = canvas.getContext("2d");
	ctx.moveTo(100,100);
	ctx.lineTo(100,500);
	ctx.stroke();
	ctx.moveTo(100,500);
	ctx.lineTo(500,500);
	ctx.stroke();
	ctx.moveTo(90,110);
	ctx.lineTo(100,100);
	ctx.stroke();
	ctx.moveTo(110,110);
	ctx.lineTo(100,100);
	ctx.stroke();
	ctx.moveTo(490,490);
	ctx.lineTo(500,500);
	ctx.stroke();
	ctx.moveTo(490,510);
	ctx.lineTo(500,500);
	ctx.stroke();
	ctx.font = "12px Arial";
	ctx.fillText("Y",97,90);
	ctx.fillText("X", 510, 503);
	//ctx.fillStyle = "#FF0000"; 
	//ctx.fillRect(0,0,150,75); 


	//Ketika tombol panah bawah ditekan

	$(".tambahButton").click(function() {
		if (maxKotak<10) {
			maxKotak++;
			$(".kotak" + maxKotak).show();
		}
	});

	//Ketika tombol panah atas ditekan

	$(".kurangButton").click(function() {
		if (maxKotak>3) {
			$(".x" + maxKotak).val("0");
			$(".y" + maxKotak).val("0");
			$(".kotak" + maxKotak).hide();
			maxKotak--;
		}
	});

	//Ketika tombol input ditekan

	$(".prosesButton").click(function() {
		sumX=0;
		sumY=0;
		sumxy=0;
		sumx2=0;
		sumy2=0;
		valMaks=0;
		for (var i=1;i<=maxKotak;i++) {
			x = parseFloat($(".x" + i).val());
			y = parseFloat($(".y" + i).val());
			if (x>valMaks)
				valMaks=x;
			if (y>valMaks)
				valMaks=y;
			$(".x-" + i).text(x);
			$(".y-" + i).text(y);
			$(".xx-" + i).text(x*x);
			$(".yy-" + i).text(y*y);
			$(".xy-" + i).text(x*y);
			$(".row" + i).show();
			sumX+=x;
			sumY+=y;
			sumx2+=x*x;
			sumy2+=y*y;
			sumxy+=x*y;
		}
		n=maxKotak;

		//Menunjukkan nilai b

		valb = ((n*sumxy)-(sumX*sumY))/((n*sumx2)-(sumX*sumX));
		var equationb = "$$ b = {N \\sum (X_i Y_i) - \\sum X_i Y_i  \\over N \\sum X_i^2 - ( \\sum X_i )^2 } = { " + n + " \\times " + sumxy + " - " + sumX  +" \\times " + sumY +"  \\over "+ n +"\\times" + sumx2 +" - (" + sumX + ")^2} = " + valb +" $$";
		document.getElementById('calculateb').innerHTML =  equationb;
  		MathJax.Hub.Queue(["Typeset",MathJax.Hub,'calculateb']);

  		//Menunjukkan nilai delta y kuadrat

		valdy2 = (1/(n-2)) * (sumy2-(((sumx2*(sumY*sumY))-(2*sumX*sumY*sumxy)+(n*sumxy*sumxy))/((n*sumx2)-(sumX*sumX))));
		var equationdy2 = "$$ \\Delta y^2 = {1 \\over N-2} \\left\\lbrack \\sum Y_i^2 - { \\sum X_i^2 (Y_i)^2 - 2 \\sum X_i \\sum Y_i \\sum (X_i Y_i) + N (\\sum X_i Y_i)^2  \\over N \\sum X_i^2 - ( \\sum X_i )^2  } \\right\\rbrack = {1 \\over " + n + "-2} \\left\\lbrack " + sumy2 + " - { "+ sumx2 +" \\times ("+ sumY +")^2 - 2 \\times "+ sumX +" \\times "+ sumY +" \\times "+ sumxy +" + "+ n +" \\times ( "+ sumxy +")^2  \\over "+ n +" \\times "+ sumx2 +" - ("+ sumX +")^2  } \\right\\rbrack = "+ valdy2 +" $$";
		document.getElementById('calculatedy2').innerHTML =  equationdy2;
  		MathJax.Hub.Queue(["Typeset",MathJax.Hub,'calculatedy2']);
  		//Menunjukkan nilai delta b

		valdb = Math.sqrt(valdy2) * Math.sqrt((n)/((n*sumx2)-(sumX*sumX)));
		var equationdb = "$$ \\Delta b = \\Delta y \\sqrt{ N \\over N \\sum X_i^2 - ( \\sum X_i )^2 } = "+ Math.sqrt(valdy2) +"  \\sqrt{ "+ n +" \\over "+ n +" \\times "+ sumx2 +" - ( "+ sumX +")^2 } = "+ valdb +" $$";
		document.getElementById('calculatedb').innerHTML =  equationdb;
  		MathJax.Hub.Queue(["Typeset",MathJax.Hub,'calculatedb']);

  		//Menunjukkan pelaporan

  		var pelaporan = "$$ Pelaporan \\ (b \\pm \\Delta b) = "+ valb +" \\pm "+ valdb +" $$"
  		document.getElementById('pelaporan').innerHTML =  pelaporan;
  		MathJax.Hub.Queue(["Typeset",MathJax.Hub,'pelaporan']);

  		//Menunjukkan tingkat ketelitian

		tk = (1-(valdb/valb))*100;
		var tketelitian = "$$ TK = 1 - { \\Delta b \\over b } \\times 100 \\% = 1 - {"+ valdb +" \\over "+ valb +"} \\times 100 \\% = "+ tk +" \\% $$";
		document.getElementById('tketelitian').innerHTML =  tketelitian;
  		MathJax.Hub.Queue(["Typeset",MathJax.Hub,'tketelitian']);
		$(".x-sum").text(sumX);
		$(".y-sum").text(sumY);
		$(".xx-sum").text(sumx2);
		$(".yy-sum").text(sumy2);
		$(".xy-sum").text(sumxy);
		posX=100;
		posY=500;
		for (var i=1;i<=maxKotak;i++) {
			if (i<2) {
				tempX = (parseFloat($(".x" + i).val())/valMaks)*350;
				tempY = (parseFloat($(".y" + i).val())/valMaks)*350;
			}
			else {
				tempX = ((parseFloat($(".x" + i).val())-parseFloat($(".x" + (i-1)).val()))/valMaks)*350;
				tempY = ((parseFloat($(".y" + i).val())-parseFloat($(".y" + (i-1)).val()))/valMaks)*350;	
			}
			ctx.font = "12px Arial";
			ctx.fillText($(".y" + i).val(), 50,posY-tempY);
			ctx.fillText($(".x" + i).val(), posX+tempX, 550);
			ctx.beginPath();
			ctx.moveTo(posX,posY);
			ctx.lineTo(posX+tempX,posY-tempY);
			ctx.strokeStyle = "#000066";
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.moveTo(100,posY-tempY);
			ctx.lineTo(posX+tempX,posY-tempY);
			ctx.strokeStyle = "#a3a375";
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.moveTo(posX+tempX,500);
			ctx.lineTo(posX+tempX,posY-tempY);
			ctx.strokeStyle = "#a3a375";
			ctx.stroke();
			ctx.closePath();
			
			posX = posX + tempX;
			posY = posY - tempY;
		}
		$(".tabelregresi").fadeIn();
		$(".hasil").fadeIn();
		$(".grafik").fadeIn();
		$(".prosesButton").hide();
		$(".tambahButton").hide();
		$(".kurangButton").hide();
		$(".ulangiButton").show();
	});
	$(".ulangiButton").click(function() {
		maxKotak = 3;
		valMaks=0;
		$(".x1").val("0");
		$(".y1").val("0");
		$(".x2").val("0");
		$(".y2").val("0");
		$(".x3").val("0");
		$(".y3").val("0");
		for (var i=4;i<=10;i++) {
			$(".x" + i).val("0");
			$(".y" + i).val("0");
			$(".kotak" + i).hide();
			$(".row" + i).hide();
		}
		$(".x-sum").text("")
		$(".y-sum").text("");
		$(".xx-sum").text("");
		$(".yy-sum").text("");
		$(".xy-sum").text("");
		$(".tabelregresi").fadeOut();
		$(".prosesButton").show();
		$(".tambahButton").show();
		$(".kurangButton").show();
		$(".ulangiButton").hide();
		$(".hasil").fadeOut();
		$(".grafik").fadeOut();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.moveTo(100,100);
		ctx.lineTo(100,500);
		ctx.stroke();
		ctx.moveTo(100,500);
		ctx.lineTo(500,500);
		ctx.stroke();
		ctx.moveTo(90,110);
		ctx.lineTo(100,100);
		ctx.stroke();
		ctx.moveTo(110,110);
		ctx.lineTo(100,100);
		ctx.stroke();
		ctx.moveTo(490,490);
		ctx.lineTo(500,500);
		ctx.stroke();
		ctx.moveTo(490,510);
		ctx.lineTo(500,500);
		ctx.stroke();
		ctx.closePath();
		ctx.font = "12px Arial";
		ctx.fillText("Y",97,90);
		ctx.fillText("X", 510, 503);
		poxX=100;
		posY=500;
	});
});