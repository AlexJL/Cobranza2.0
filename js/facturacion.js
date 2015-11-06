function verFacturacion()
{
    document.getElementById('charts').style.display = "none";
    document.getElementById('table1').style.display = "none";
    
    var x=document.getElementById('myselect').selectedIndex;
    var mes;
    var mesinicio;
    var mesfinal;
    if(x == 0)
        {
            var mesinicio = "01/11/15";
            var mesfinal = "30/11/15";
            /*mes = localStorage.getItem('mes11');
            var dia = verificarDia(1);
            mes = mes.replace('-','/');
             mesinicio = "01/"+mes;
            mesfinal = dia+"/"+mes;
            document.getElementById('mesG').innerHTML = localStorage.getItem('mesactual');*/
        }
    else if(x == 1)
        {
            var mesinicio = "01/10/15";
            var mesfinal = "31/10/15";
            /*mes = localStorage.getItem('mes12');
            var dia = verificarDia(2);
            mes = mes.replace('-','/');
             mesinicio = "01/"+mes;
            mesfinal = dia+"/"+mes;
            document.getElementById('mesG').innerHTML = localStorage.getItem('mespasado');*/
        }
    else if(x == 2)
        {
            var mesinicio = "01/09/15";
            var mesfinal = "30/09/15";
            /*mes = localStorage.getItem('mes13');
            var dia = verificarDia(3);
            mes = mes.replace('-','/');
             mesinicio = "01/"+mes;
            mesfinal = dia+"/"+mes;
            document.getElementById('mesG').innerHTML = localStorage.getItem('mesantepasado');*/
        }
    else if(x == 3)
        {
            var mesinicio = "01/08/15";
            var mesfinal = "31/08/15";/*
            mes = localStorage.getItem('mes14');
            mes = mes.replace('-','/');
            var dia = verificarDia(1);
            mesinicio = "01/"+mes;
            mesfinal = dia+"/"+mes;
            document.getElementById('mesG').innerHTML = localStorage.getItem('mesaniopasado');*/
        }
    else{
        var mesinicio = "01/11/15";
        var mesfinal = "30/11/15";
        /*mes = localStorage.getItem('mes11');
        document.getElementById('mesG').innerHTML = localStorage.getItem('mesactual');*/
    }
    
    
    
    
    $("#LoadingImage1").show();
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza/facturacion1.php",
            data: ({fechai:mesinicio,fechaf:mesfinal}),
            cache: false,
            dataType: "text",
            success: onSuccess
            });        
}

function onSuccess(data)
{
    $("#LoadingImage1").hide();
    if(data=="")
        {
            alert("No se obtuvo éxito");
        }
    else{
        var ancho= $(window).width();
        var ancho = ancho - 20;
        var alto = $(window).height();
        var alto = alto - 50;
        //document.getElementById('ver-grafico').width = ancho;
        //document.getElementById('ver-grafico').height = alto;
        
        var montos = new Array();
        var cantidades = new Array();
        var nombres = new Array();

        var cadena="";
        var cadena1 = "";
        var cadena2 = "";
        var k = 0;
        var cont=0;
        var cont1 = 0;
        var cont2 = 0;
        for(var i=0;i<data.length;i++)
        {
            if(data.charAt(i) != "$" && k==0)
                {
                    cadena = cadena + data.charAt(i);
                    k = 0;
                }
            else if(data.charAt(i) != "$" && k==1)
                {
                    cadena1 = cadena1 + data.charAt(i);
                    k = 1;
                }  
            else if(data.charAt(i) != "$" && k==2)
                {
                    cadena2 = cadena2 + data.charAt(i);
                    k = 2;
                }
            else if(data.charAt(i) == "$" && k == 0)
                {  
                    nombres[cont] = cadena;
                    cadena= "";
                    i++;
                    cont++;
                    k=1;
                }
            else if(data.charAt(i) == "$" && k == 1)
                {
                    cantidades[cont1] = cadena1;
                    cadena1 = "";
                    i++;
                    cont1++;
                    k = 2;
                }
            else if(data.charAt(i) == "$" && k==2)
                {
                    montos[cont2] = cadena2;
                    cadena2 = "";
                    i++;
                    cont2++;
                    k = 0;
                }
        }
        
        var tam = montos.length;
        var datos = new Array(new Array(tam+1),new Array(tam +1),new Array(tam+1));      
              
        datos[0][0] = "Documento";
        datos[1][0] = "Cantidad";
        datos[2][0] = "Importe";
        for(var i = 1; i<tam+1; i++)
            {
                datos[0][i] = nombres[i-1];
                datos[1][i] = cantidades[i-1];
                datos[2][i] = parseFloat(montos[i-1]);
            }
        
        var datos1 = new google.visualization.DataTable();
                datos1.addColumn('string','Documentos');
                datos1.addColumn('number','Montos');
                for(var z = 1;z<tam+1;z++)
                    {
                        datos1.addRows([
                             [datos[0][z],datos[2][z]]
                         ]);
                    }
                
        var datos2 = new google.visualization.DataTable();
                datos2.addColumn('string','Documentos');
                datos2.addColumn('number','Montos');
                for(var z = 1;z<tam+1;z++)
                    {
                        datos2.addRows([
                             [datos[0][z],datos[2][z]]
                         ]);
                    }
        
        var x3 = document.getElementById('myselect2').selectedIndex;
                var grafica1;
                if(x3 == 0)
                {
                    grafica1 =  new  google.visualization.BarChart(document.getElementById('charts'));
                }
                else if(x3 == 1)
                {
                     grafica1 =  new  google.visualization.PieChart(document.getElementById('charts'));       
                }
                else if(x3 == 2)
                {
                    grafica1 =  new  google.visualization.ColumnChart(document.getElementById('charts'));       
                }
                else if(x3 == 3)
                {
                     grafica1 =  new  google.visualization.AreaChart(document.getElementById('charts'));         
                } 
                else if(x3 == 4)
                {
                     grafica1 =  new  google.visualization.LineChart(document.getElementById('charts'));         
                }
                else{
                    grafica1 =  new  google.visualization.ColumnChart(document.getElementById('charts'));   
                }
                    
        
        
        dibujar(datos1,ancho,grafica1);
        dibujar1(datos2,ancho);
        
        document.getElementById('charts').style.display = "block";
    document.getElementById('table1').style.display = "block";
       //genera_tabla(datos,tam);
    }
}

/*function genera_tabla(datos,tam) {
  // Obtener la referencia del elemento body
  var body = document.getElementById("table1");
 
  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
    tabla.setAttribute("class","demo");
  var tblBody = document.createElement("tbody");
  // Crea las celdas
  for (var i = 0; i < tam+1; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
 
    for (var j = 0; j < 3; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(datos[j][i]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
 
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }
 
  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "0");
}*/

