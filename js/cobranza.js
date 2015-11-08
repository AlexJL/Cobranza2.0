var tam2 = 0;
function verDocumento()
{
    var x1=document.getElementById('myselect4').selectedIndex;
    var mesinicio1;
    var mesfinal1;
    var f1 = new Date();
    if(x1 == 0)
        {
            var dia = f1.getDate();
            mesfinal1 = dia+"/"+datos4[0][1];
            mesinicio1 = "01"+"/"+datos4[0][1];
        }
    else if(x1 == 1)
        {
            var dia1 = verificarDia(2);
            mesfinal1 = dia1+"/"+datos4[0][2];
            mesinicio1 = "01"+"/"+datos4[0][2];
        }
    else if(x1 == 2)
        {
            var dia1 = verificarDia(3);
            mesinicio1 = "01/"+datos4[0][3];
            mesfinal1 = dia1+"/"+datos4[0][3];
        }
    else if(x1 == 3)
        {
            var dia1 = verificarDia(4);
            mesinicio1 = "01/"+datos4[0][4];
            mesfinal1 = dia1+"/"+datos4[0][3];
        }
    else{
        var dia = f.getDate();
        mesinicio1 = "01"+"/"+datos4[0][1];
        mesfinal1 = dia+"/"+datos4[0][1];
    }
    
     $("#LoadingImage3").show();
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza/cobranza2.php",
            data: ({mesf:mesfinal1,mesi:mesinicio1}),
            cache: false,
            dataType: "text",
            success: onSuccess2
            });
}

function onSuccess2(data)
{
    var ancho= $(window).width();
    var ancho = ancho - 20;
    var alto = $(window).height();
    var alto = alto - 50;
    var montos1 = new Array();
    var cantidades1 = new Array();
    var nombres1 = new Array();
    var cad11="";var cad22 =""; var cad33="";
    var cont11=0;var cont12 = 0; var cont13 =0;
    var k = 0;
    
    $("#LoadingImage3").hide();
        if(data=="")
            {
                alert("No se obtuvo éxito");
            }
        else
        {
            for(var i=0;i<data.length;i++)
            {
                if(data.charAt(i) != "$" && k == 0)
                    {
                        cad11 = cad11 + data.charAt(i);
                        k = 0;
                    }
                else if(data.charAt(i) != "$" && k== 1)
                    {
                        cad22 = cad22 + data.charAt(i);
                        k =  1;
                    }
                else if(data.charAt(i) != "$" && k==2)
                    {
                        cad33 = cad33 + data.charAt(i);
                        k = 2;
                    }
                else if(data.charAt(i) == "$" && k == 0)
                    {
                        nombres1[cont11] = cad11;
                        cad11 = "";
                        k = 1;
                        cont11++;
                        i++;
                    }
                else if(data.charAt(i) == "$" && k==1)
                    {
                        montos1[cont12] = cad22;
                        cad22 = "";
                        k = 2;
                        cont12++;
                        i++;
                    }
                else if(data.charAt(i) == "$" && k==2)
                    {
                        cantidades1[cont13] = cad33;
                        cad33 = "";
                        k = 0;
                        cont13++;
                        i++;
                    }
            }
            
            tam2 = montos1.length;
            datos5 = new Array(new Array(tam2+1),new Array(tam2 +1),new Array(tam2+1));
            datos5[0][0] = "Documento";
            datos5[0][1] = "Monto";
            datos5[0][2] = "Cantidad";
            
            for(var i = 1; i<tam2+1; i++)
            {
                datos5[0][i] = nombres1[i-1];
                datos5[2][i] = cantidades1[i-1];
                datos5[1][i] = parseFloat(montos1[i-1]);
            }
            
            
            var datos6 = new google.visualization.DataTable();
                datos6.addColumn('string','Documentos');
                datos6.addColumn('number','Montos');
                for(var z = 1;z<tam2+1;z++)
                    {
                        datos6.addRows([
                             [datos5[0][z],datos5[1][z]]
                         ]);
                    }
                
            var datos7 = new google.visualization.DataTable();
                datos7.addColumn('string','Documentos');
                datos7.addColumn('number','Montos');
                for(var z = 1;z<tam2+1;z++)
                    {
                        datos7.addRows([
                             [datos5[0][z],datos5[1][z]]
                         ]);
                    }
            
            var x4 = document.getElementById('myselect5').selectedIndex;
                var grafica3;
                if(x4 == 0)
                {
                    grafica3 =  new  google.visualization.BarChart(document.getElementById('charts2'));
                }
                else if(x4 == 1)
                {
                     grafica3 =  new  google.visualization.ColumnChart(document.getElementById('charts2'));       
                }
                else if(x4 == 2)
                {
                    grafica3 =  new  google.visualization.AreaChart(document.getElementById('charts2'));       
                }
                else if(x4 == 3)
                {
                     grafica3 =  new  google.visualization.LineChart(document.getElementById('charts2'));         
                } 
                else{
                    grafica3 =  new  google.visualization.BarChart(document.getElementById('charts2'));   
                }
            
            dibujar3(datos6,ancho,grafica3);
            dibujar6(datos7,ancho);
        }
}


function verEmpresa()
{
    var x=document.getElementById('myselect4').selectedIndex;
    var mes;
    var mesinicio;
    var mesfinal;
    var f1 = new Date();
    if(x == 0)
        {
            var dia = f1.getDate();
            mesfinal = dia+"/"+datos4[0][1];
            mesinicio = "01"+"/"+datos4[0][1];
        }
    else if(x == 1)
        {
            var dia1 = verificarDia(2);
            mesfinal = dia1+"/"+datos4[0][2];
            mesinicio = "01"+"/"+datos4[0][2];
        }
    else if(x == 2)
        {
            var dia1 = verificarDia(3);
            mesinicio = "01/"+datos4[0][3];
            mesfinal = dia1+"/"+datos4[0][3];
        }
    else if(x == 3)
        {
            var dia1 = verificarDia(4);
            mesinicio = "01/"+datos4[0][4];
            mesfinal = dia1+"/"+datos4[0][3];
        }
    else{
        var dia = f.getDate();
        mesinicio = "01"+"/"+datos4[0][1];
        mesfinal = dia+"/"+datos4[0][1];
    }
    
     $("#LoadingImage3").show();
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza/cobranza1.php",
            data: ({mesf:mesfinal,mesi:mesinicio}),
            cache: false,
            dataType: "text",
            success: onSuccess3
            });
    
}

function onSuccess3(data)
{
    $("#LoadingImage3").hide();
    if(data=="")
        {
            alert("No se obtuvo éxito");
        }
    else
    {
        var ancho= $(window).width();
        var ancho = ancho - 20;
        var alto = $(window).height();
        var alto = alto - 50;
        var nombre2 = new Array();
        var cantidades2 = new Array();
        var cad31 = ""; var cad32 ="";
        var cont33 = 0; var cont22 = 0; k = 0;
        for(var i=0;i<data.length;i++)
        {
            if(data.charAt(i) != "$" && k == 0)
                {
                    cad31 = cad31 + data.charAt(i); 
                }
            else if(data.charAt(i) != "$" && k == 1)
                {
                    cad32 = cad32 + data.charAt(i);
                }
            else if(data.charAt(i) == "$" && k == 0)
                {
                    nombre2[cont22] = cad31;
                    cont22++;
                    i++;
                    k = 1;
                    cad31 = "";
                }
            else if(data.charAt(i) == "$" && k == 1)
                {
                    cantidades2[cont33] = cad32;
                    cont33++;
                    i++;
                    k = 0;
                    cad32 = "";
                }
        }
        
        var tam3 = nombre2.length;
        datos8 = new Array(new Array(tam3+1),new Array(tam3+1));
        datos8[0][0] = "Empresa";
        datos8[1][0] = "Montos";
        
        for(var i = 1; i<tam3+1; i++)
            {
                datos8[0][i] = nombre2[i-1];
                datos8[1][i] = parseFloat(cantidades2[i-1]);
            }
        
        var datos9 = new google.visualization.DataTable();
                datos9.addColumn('string','Empresa');
                datos9.addColumn('number','Montos');
                for(var z = 1;z<tam3+1;z++)
                    {
                        datos9.addRows([
                             [datos8[0][z],datos8[1][z]]
                         ]);
                    }
                
            var datos10 = new google.visualization.DataTable();
                datos10.addColumn('string','Empresa');
                datos10.addColumn('number','Montos');
                for(var z = 1;z<tam3+1;z++)
                    {
                        datos10.addRows([
                             [datos8[0][z],datos8[1][z]]
                         ]);
                    }
        var x4 = document.getElementById('myselect5').selectedIndex;
                var grafica3;
                if(x4 == 0)
                {
                    grafica3 =  new  google.visualization.BarChart(document.getElementById('charts2'));
                }
                else if(x4 == 1)
                {
                     grafica3 =  new  google.visualization.ColumnChart(document.getElementById('charts2'));       
                }
                else if(x4 == 2)
                {
                    grafica3 =  new  google.visualization.AreaChart(document.getElementById('charts2'));       
                }
                else if(x4 == 3)
                {
                     grafica3 =  new  google.visualization.LineChart(document.getElementById('charts2'));         
                } 
                else{
                    grafica3 =  new  google.visualization.BarChart(document.getElementById('charts2'));   
                }
        
        dibujar3(datos9,ancho,grafica3);
        dibujar6(datos10,ancho);
        
        
    }
}

function dibujar3(valor,x,y)
{
    var grafica2 = y;
    var ancho1 = x;
    var datos1= valor;
    var opciones = {'title':'Cobranza por Documento',
                    'width':ancho1,
                    'height':400};     
    grafica2.draw(datos1,opciones);
}

function dibujar6(valor,x)
{
    var ancho2 = x;
    var datos2 = valor;
    var opciones = {'title':'cobranza por Documento',
                    'width':ancho2,
                    'height':300,
                    colors: ['#78123A']};          
    var grafica =   new  google.visualization.Table(document.getElementById('table3'));
    grafica.draw(datos2,opciones);
}
