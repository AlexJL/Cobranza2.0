var tam1 = 0;

function verCF()
{
    $("#LoadingImage2").show();
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza/consulta-cobranza.php",
            data: ({}),
            cache: false,
            dataType: "text",
            success: onSuccess1
            });  
}

function onSuccess1(data)
{
    
    $("#LoadingImage2").hide();
    if(data=="")
        {
            alert("No se obtuvo éxito");
        }
    else{
        var ancho= $(window).width();
        vancho = ancho - 20;
        var alto = $(window).height();
        var alto = alto - 50;
        var fechas = new Array();
        var facturacion = new Array();
        var cobranza = new Array();
        var cad = "";var cad1 = ""; var cad2 = "";
        var cont = 0; var cont1 = 0; var cont2 = 0;
        var k = 0;
        for(var i=0;i<data.length;i++)
            {
                if(data.charAt(i)!= "|" && k<4)
                    {
                        cad = cad + data.charAt(i);
                    }
                else if(data.charAt(i) != "$" && k >= 4 && k<8)
                    {
                        cad1 = cad1 + data.charAt(i);
                    }
                else if(data.charAt(i) != "*" && k >=8)
                    {
                        cad2 = cad2 + data.charAt(i);
                    }
                else if(data.charAt(i) == "|" && k<4)
                    {
                        fechas[cont] = cad;
                        cont++;
                        i++;
                        k++;
                        cad = "";
                    }
                else if(data.charAt(i) == "$" && k>=4 && k<8)
                    {
                        facturacion[cont1] = cad1;
                        cont1++;
                        k++;
                        i++;
                        cad1 = "";
                    }
                else if(data.charAt(i) == "*" && k>=8)
                    {
                        cobranza[cont2] = cad2;
                        cad2 = "";
                        i++;
                        k++;
                        cont2++;
                    }
            }
         tam1 = fechas.length;
        datos4 = new Array(new Array(tam1+1), new Array(tam1+1), new Array(tam1+1));
        datos4[0][0] = "Fechas";
        datos4[1][0] = "Facturación";
        datos4[2][0] = "Cobranza";
        
         for(var i = 1; i<tam1+1; i++)
            {
                datos4[0][i] = fechas[i-1];
                datos4[1][i] = parseFloat(facturacion[i-1]);
                datos4[2][i] = parseFloat(cobranza[i-1]);
            }
        
        alert("Graficos cargados Correctamente");
        document.getElementById('btn-grafico').disabled = false;
        verificar = 1;
    }
    
}

function graficarMontos()
{
    var ancho= $(window).width();
    ancho = ancho - 20;
    if(verificar == 1)
        {
    var grafica;
        var x1=document.getElementById('myselect1').selectedIndex;
        if(x1 == 0)
            {
                grafica =   new  google.visualization.ColumnChart(document.getElementById('charts1'));
            }
        else if(x1 == 1)
            {
                grafica =   new  google.visualization.BarChart(document.getElementById('charts1'));
            }
        else if(x1 == 2)
            {
                grafica =   new  google.visualization.ComboChart(document.getElementById('charts1'));
            }
        else if(x1==3){
             grafica =   new  google.visualization.AreaChart(document.getElementById('charts1'));
            }
        else
            {
                var container = document.getElementById('charts1')
                grafica =   new  google.visualization.LineChart(container);
            }
        
        var datos3 = new google.visualization.DataTable();
                datos3.addColumn('string','Mes');
                datos3.addColumn('number','Facturacion');
                datos3.addColumn('number','Cobranza')
                for(var j=tam1;j>0;j--)
                    {
                        datos3.addRows([
                            [datos4[0][j],datos4[1][j],datos4[2][j]]
                            ]);
                    }
                
        dibujar3(datos3,ancho,grafica);
        dibujar4(datos3,ancho);
            }
    else
        {
            alert("De primero en el boton de Cargar Montos");
        }
        
}

function cargarMeses1()
{
    if(verificar == 1)
        {
    for(var i = 1; i<tam1+1;i++)
        {
            var cad1 = "";
            var cad2 = "";
            var ayuda = datos4[0][i];
            var k = 0;
            for(var j = 0; j<ayuda.length;j++)
                {
                    if(ayuda.charAt(j) != '/' && k==0)
                        {
                            cad1 = cad1 + ayuda.charAt(j);
                        }
                    else if(ayuda.charAt(j)  != '/' && k == 1)
                        {
                            cad2 = cad2 + ayuda.charAt(j);
                        }
                    else if(ayuda.charAt(j) == '/'){
                        k++;
                    }
                }
            colocar(i-1,cad1,cad2);
        }
            $.mobile.changePage( "index.html#facturacion", { transition: "slideup", changeHash: true });
            
            }
    else
        {
            alert("Debe Cargar Datos Primero");
        }
}

function colocar(valor, cad, cad1)
{
    var cadena = "";
    if(cad == '01')
        {
            cadena = "ENERO - ";
        }
    else if(cad == '02')
        {
            cadena = "FEBRERO - ";
        }
    
    else if(cad == '03')
        {
            cadena = "MARZO - ";
        }
    else if(cad == '04')
        {
            cadena = "ABRIL - ";
        }
    else if(cad == '05')
        {
            cadena = "MAYO - ";
        }
    else if(cad == '06')
        {
            cadena = "JUNIO - ";
        }
    else if(cad == '07')
        {
            cadena = "JULIO - ";
        }
    else if(cad == '08')
        {
            cadena = "AGOSTO - ";
        }
    else if(cad == '09')
        {
            cadena = "SETIEMBRE - ";
        }
    else if(cad == '10')
        {
            cadena = "OCTUBRE - ";
        }
    else if(cad == '11')
        {
            cadena = "NOVIEMBRE - ";
        }
    else if(cad == '12')
        {
            cadena = "DICIEMBRE - ";
        }
    
    cad1 = "20"+cad1;
    cadena = cadena + cad1;
    alert(cadena);
    var variable2 = new Option(cadena,"value","defaultSelected","selected");
    document.getElementById("myselect").options[valor] = variable2;
}

function cargarMeses1()
{
    if(verificar == 1)
        {
    for(var i = 1; i<tam1+1;i++)
        {
            var cad1 = "";
            var cad2 = "";
            var ayuda = datos4[0][i];
            var k = 0;
            for(var j = 0; j<ayuda.length;j++)
                {
                    if(ayuda.charAt(j) != '/' && k==0)
                        {
                            cad1 = cad1 + ayuda.charAt(j);
                        }
                    else if(ayuda.charAt(j)  != '/' && k == 1)
                        {
                            cad2 = cad2 + ayuda.charAt(j);
                        }
                    else if(ayuda.charAt(j) == '/'){
                        k++;
                    }
                }
            colocar(i-1,cad1,cad2);
        }
            $.mobile.changePage( "index.html#facturacion", { transition: "slideup", changeHash: true });
            
            }
    else
        {
            alert("Debe Cargar Datos Primero");
        }
}

function colocar(valor, cad, cad1)
{
    var cadena = "";
    if(cad == '01')
        {
            cadena = "ENERO - ";
        }
    else if(cad == '02')
        {
            cadena = "FEBRERO - ";
        }
    
    else if(cad == '03')
        {
            cadena = "MARZO - ";
        }
    else if(cad == '04')
        {
            cadena = "ABRIL - ";
        }
    else if(cad == '05')
        {
            cadena = "MAYO - ";
        }
    else if(cad == '06')
        {
            cadena = "JUNIO - ";
        }
    else if(cad == '07')
        {
            cadena = "JULIO - ";
        }
    else if(cad == '08')
        {
            cadena = "AGOSTO - ";
        }
    else if(cad == '09')
        {
            cadena = "SETIEMBRE - ";
        }
    else if(cad == '10')
        {
            cadena = "OCTUBRE - ";
        }
    else if(cad == '11')
        {
            cadena = "NOVIEMBRE - ";
        }
    else if(cad == '12')
        {
            cadena = "DICIEMBRE - ";
        }
    
    cad1 = "20"+cad1;
    cadena = cadena + cad1;
    alert(cadena);
    var variable2 = new Option(cadena,"value","defaultSelected","selected");
    document.getElementById("myselect").options[valor] = variable2;
}

function cargarMeses()
{
    if(verificar == 1)
        {
    for(var i = 1; i<tam1+1;i++)
        {
            var cad1 = "";
            var cad2 = "";
            var ayuda = datos4[0][i];
            var k = 0;
            for(var j = 0; j<ayuda.length;j++)
                {
                    if(ayuda.charAt(j) != '/' && k==0)
                        {
                            cad1 = cad1 + ayuda.charAt(j);
                        }
                    else if(ayuda.charAt(j)  != '/' && k == 1)
                        {
                            cad2 = cad2 + ayuda.charAt(j);
                        }
                    else if(ayuda.charAt(j) == '/'){
                        k++;
                    }
                }
            colocar1(i-1,cad1,cad2);
        }
            $.mobile.changePage( "index.html#cobranza", { transition: "slideup", changeHash: true });
            
            }
    else
        {
            alert("Debe Cargar Datos Primero");
        }
}

function colocar1(valor, cad, cad1)
{
    var cadena = "";
    if(cad == '01')
        {
            cadena = "ENERO - ";
        }
    else if(cad == '02')
        {
            cadena = "FEBRERO - ";
        }
    
    else if(cad == '03')
        {
            cadena = "MARZO - ";
        }
    else if(cad == '04')
        {
            cadena = "ABRIL - ";
        }
    else if(cad == '05')
        {
            cadena = "MAYO - ";
        }
    else if(cad == '06')
        {
            cadena = "JUNIO - ";
        }
    else if(cad == '07')
        {
            cadena = "JULIO - ";
        }
    else if(cad == '08')
        {
            cadena = "AGOSTO - ";
        }
    else if(cad == '09')
        {
            cadena = "SETIEMBRE - ";
        }
    else if(cad == '10')
        {
            cadena = "OCTUBRE - ";
        }
    else if(cad == '11')
        {
            cadena = "NOVIEMBRE - ";
        }
    else if(cad == '12')
        {
            cadena = "DICIEMBRE - ";
        }
    
    cad1 = "20"+cad1;
    cadena = cadena + cad1;
    alert(cadena);
    var variable2 = new Option(cadena,"value","defaultSelected","selected");
    document.getElementById("myselect4").options[valor] = variable2;
}


