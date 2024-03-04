let dataAPI;
let dataBar = []; //buat variabel global
let dataPie = [433, 203,335,544]; //supaya jadi variabel global
let colors = ['pink','red', 'purple', 'green']; //untuk pieplot
let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTN4nLYEakWVA8n7aTmvG9oBd1ODR6r-wW8LBweV-_2p_N2spBUkeycL_0DudLFqLvqF8-SxfMxxh1M/pub?output=csv';
let dataSheet;

let xData;
let yData;
let urlAPI ="https://api.openweathermap.org/data/2.5/weather?q=Lampung&appid=201c60a239c7bea451f33a8ec231d370&units=metric";

function preload(){ 
  dataSheet = loadTable(url, 'csv', 'header'); 
  dataAPI = loadJSON(urlAPI);
}

function linePlot(xData, yData){ 
  var maxX = max(xData); 
  var minX = min(xData); 
  var maxY = max(yData); 
  var minY = min(yData); 
  var w = (windowWidth/2) / (xData.length-1); 
  for (var i=0; i < xData.length; i++){ 
    var x1 = map(xData[i],minX,maxX,0,windowWidth/2 ); 
    var x2 = map(xData[i+1],minX,maxX,0,windowWidth/2 ); 
    var y1 = map(yData[i],minY,maxY,0,windowHeight/2 ); 
    var y2 = map(yData[i+1],minY,maxY,0,windowHeight/2 ); 
    line(i*w,windowHeight - y1,(i+1)*w,windowHeight - y2); 
    ellipse(i*w,windowHeight - y1,10,10) 
      } 
  } 
  
  function barPlot(dataBar){ 
    stroke(222); 
    fill(0,76,130);  
    var maxBar = max(dataBar); 
    var w = (windowWidth/2) / dataBar.length; 
    for (var i=0; i<dataBar.length;i++){ 
    var dat = map(dataBar[i], 0, maxBar, 0, windowHeight/2 ) 
    rect(i*w, windowHeight/2 - dat, w, dat) 
      } 
  } 
  
  function persentase(arr){ 
    var tot = 0; 
    for (var i=0; i<arr.length;i++){ 
        tot = tot + arr[i] 
      } 
    var per = [] 
    for (var i=0; i<arr.length;i++){ 
        per[i] = arr[i] / tot 
      } 
      return per 
    } 
    
    
    function piePlot(dataPie){ 
      let diameter = windowHeight / 3; 
      let lastAngle = 0; 
      var dataPer = persentase(dataPie); 
      strokeWeight(2);
      stroke(222);
       
      
      for (let i = 0; i < dataPer.length; i++) { 
        var angles = dataPer[i] * 360; 
        fill(colors[i]) 
        arc( windowWidth * 3 / 4,windowHeight * 1 / 4,diameter,diameter,lastAngle,lastAngle + radians(angles)
        ); 
        lastAngle += radians(angles); 
      } 
    } 
    
    function setup() { 
        createCanvas(windowWidth, windowHeight);   
        for (var i = 0; i < 100; i++){ 
            dataBar[i] = random(0,100);
        } 

        xData = dataSheet.getColumn('x');
        yData = dataSheet.getColumn('y');
    } 
    
    function windowResized() { 
        resizeCanvas(windowWidth, windowHeight); 
    } 
    
    function infoCuaca(x, y, data, fontsize){
        textSize(fontsize)
        fill("black")
        stroke(143,188,170)
        text(data.name,
        posX = x,
        posY = y)
        text("Cuaca = "+ data.weather[0].main,
        posX = x,
        posY = y + fontsize)
        text("Temperatur = "+ data.main.temp,
        posX = x ,
        posY = y + 2*fontsize)
        text("Kecepatan angin = "+ data.wind.speed,
        posX = x,
        posY = y + 3*fontsize) 
        }
    
    function draw() { 
        background(55,134,170) 
        strokeWeight(1);
        stroke(222);
        line(windowWidth/2, 0, windowWidth/2, windowHeight) 
        line(0, windowHeight/2, windowWidth, windowHeight/2) 
        barPlot(dataBar);
        piePlot(dataPie);
        linePlot(xData, yData);
        infoCuaca(windowWidth * 3 / 5,windowHeight * 3 / 4, dataAPI,windowWidth/30)
    }    
