var diryj,dirxj,jog,velj,pjx,pjy;
var velt,velb;
var jogo;
var frames;
var tamtelaw,tamtelah;
var contbombs,plncont;
var totbombas;
var lifeplanet;
var tmpbombs;
var inde;





function teclaDw(){    
    			              			//função que trata do controle de Keydonw
	var tecla=event.keyCode;
			if(tecla==38){									//valida os movimentos para cima baixo direita e esquerda
				diryj=-1;
			}else if (tecla==40){
				diryj=1;
			}else if(tecla==37){
				dirxj=-1;
			}else if(tecla==39){
				dirxj=1;
			}else if(tecla==32){
				atira(pjx+45,pjy);
			}

}


function teclaUp(){
		var tecla=event.keyCode;			//para tratar melhor a questa da movimentação, aplicando 0 sempre que a tecla é solta
			if((tecla==38) || (tecla==40)){
				diryj=0;
		
		} if((tecla==37) || (tecla==39)){
				dirxj=0;
			}

}

function criarbomb(){
	if(jogo){
		var bomby=0;									//cria objeto bomba do game
		var bombx=(Math.random()*tamtelaw);
		var bomb=document.createElement("div");
		var att1=document.createAttribute("class");
		var att2=document.createAttribute("style");
		att1.value="bomb";
		att2.value="top:"+bomby+"px;left:"+bombx+"px";
		bomb.setAttributeNode(att1);
		bomb.setAttributeNode(att2);
		document.body.appendChild(bomb);
		contbombs--;
	}
}

function controledebombs(){
	totbombas=document.getElementsByClassName("bomb");
	var tam=totbombas.length;
	for(var i=0; i<tam;i++){								//utilizandosse das bombas ja criadas faz-se o controle da queda e 
		if(totbombas[i]){									//exclusão das bombas
			var pi=totbombas[i].offsetTop;
			pi+=velb;
			totbombas[i].style.top=pi+"px";
			if(pi>tamtelah){
				//lifeplanet-=10;
				expa(2,totbombas[i].offsetLeft+50, null);
				totbombas[i].remove();
			}
		}

	}
}

function atira(x,y){
	var ti=document.createElement("div");					//trata dos tiros, criando os elementos tiros na DOM
	var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
	att1.value="tirojog";
	att2.value="top:"+y+"px;left:"+x+"px";
	ti.setAttributeNode(att1);
	ti.setAttributeNode(att2);
	document.body.appendChild(ti);

}







function controletiro(){
	var tiros=document.getElementsByClassName("tirojog");
	var tam=tiros.length;
	for(var i=0; i<tam; i++){								//controla os tiros em relação a sua movimentação em tela
		if(tiros[i]){										//tambem faz sua exclusão apos o mesmo sair da tela.
			var pt=tiros[i].offsetTop;
			pt-=velt;
			tiros[i].style.top=pt+"px";
			colisiontb(tiros[i]);
			if(pt<0){
				document.body.removeChild(tiros[i]);
			
			}
		}

	}
}
function colisiontb(tiro){										//tratara da questao da colisão dos tiros com as bombas
	var tam=totbombas.length;
	for(var i=0;i<tam;i++){
		if(totbombas[i]){
			if(
				(

					(tiro.offsetTop<=(totbombas[i].offsetTop+55))&&
					((tiro.offsetTop+6)>=(totbombas[i].offsetTop))
				)&&(
				
					(tiro.offsetLeft<=(totbombas[i].offsetLeft+45))&&
					((tiro.offsetLeft+6)>=(totbombas[i].offsetLeft))
					
					)

			  ) {
			  	expa(1,totbombas[i].offsetTop,totbombas[i].offsetLeft);
				totbombas[i].remove();
			  	tiro.remove();

			 }

		}

	}	
}		
function expa(tipo,x,y){

	


	var explosao=document.createElement("div");
	var img=document.createElement("img");
	var aa=document.getElementById("explosao"+(inde-1));
	if(aa){

		aa.remove();
	}

	var att1d=document.createAttribute("class");
	var att2d=document.createAttribute("style");
	var att3d=document.createAttribute("id");

	var att1i=document.createAttribute("src");

		att3d.value="explosao"+inde;
	if (tipo==1) {

		att1d.value="explosaar";
		att2d.value="top:"+x+"px;left:"+y+"px;";
		
	}else{
		att1d.value="explosachao";
		att2d.value="top:"+(tamtelah-60)+"px;left:"+(x-60)+"px;";
		
	}
	inde++;

	explosao.setAttributeNode(att1d);
	explosao.setAttributeNode(att2d);
	explosao.setAttributeNode(att3d);
	img.setAttributeNode(att1i);
	document.body.appendChild(explosao);
	document.body.appendChild(img);
	document.body.removeChild(img);
}

function controlaplayer(){
	pjy+=diryj*velj;
	pjx+=dirxj*velj;										//função que trata da movimentação do jogado, 
	jog.style.top=pjy+"px";									// com a relação pos*velo, aplincado do calculo 
    jog.style.left=pjx+"px";								//o controle de movimento.

}




function gameLoop(){
if(jogo){
	//control function
	controlaplayer();										//trabalha na chamadas de controle do game
	controletiro();											//e utiliza de recursividade para fazer sua propia chamada depois,
	controledebombs();	
															//chamando tambem as outras funções dentro de si.
 }
 frames=requestAnimationFrame(gameLoop);
}


function inicia(){
jogo=true;
//ini tela
tamtelah=window.innerHeight;								//responsavel por iniciar a maioria da variaveis de utilização
tamtelaw=window.innerWidth;									// global, alem de capturar o tamanho da tela, tornando a interface do game 
//ini jogador												//mais recursiva para utilização
dirxj=0;
diryj=0;													//dentro do inicia(), cada coment, separa a inicialização de
pjx=tamtelaw/2;												//uma outra função especifica, praticamente tudo passa por aqui.
pjy=tamtelah/2;												//
velj=10;
velt=5;
velb=5;
jog=document.getElementById("navejog");
jog.style.top=pjy+"px";
jog.style.left=pjx+"px";
//controlbomb
clearInterval(tmpbombs);
contbombs=150;
tmpbombs=setInterval(criarbomb, 1500);
//planetcontrol
lifeplanet=200;
//controlexpl
inde=0;
gameLoop();
}


window.addEventListener("load", inicia);
window.addEventListener("keydown", teclaDw);
window.addEventListener("keyup", teclaUp);