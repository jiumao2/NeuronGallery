function show_options_animal()
{
    if( $("#id_animal_options").is(":hidden") )
        $("#id_animal_options").show();
    else
        $("#id_animal_options").hide();
}
function show_options_date(){
    if( $("#id_date_options").is(":hidden") )
        $("#id_date_options").show();
    else
        $("#id_date_options").hide();        
}

//复选框勾选，更新显示
function chk_changed(name)
{
    var str_selected = "";
    var lstChk = document.getElementsByName( "select_checkbox_" + name);

    for( var n = 0; n < lstChk.length; n++ )
    {
        if(lstChk[n].value == 'All' && lstChk[n].checked){
            for( var i = 0; i < lstChk.length; i++ ){
                lstChk[i].checked = true;
            }
        }
    }
}

function get_html_child_img_result(data){
    html = '\
    <div id="img_result_'+data.ID+'" class="img-result">\
        <a href="details.html?'+data.ID+'">'+data.Animal+' '+data.Date+'  \
            Channel '+data.Channel+' Cluster '+data.Cluster+'</a> \
    <img src="'+data.ImgPath+'"> \
    </div> \
    '
    return html
}

function get_animals_date(data){
    var out = new Object();
    var animals = [];
    var count = data.count;
    var date;
    for(var k=1;k<=count;k++){
        date = data[k].Date.split(' ')[0]
        if(animals.indexOf(data[k].Animal)==-1){
            animals.push(data[k].Animal);
            out[data[k].Animal] = [date];
        }
        else{
            if(out[data[k].Animal].indexOf(date)==-1){
                out[data[k].Animal].push(date);
            }            
        }
    }
    out['animals'] = animals;
    

    return out;
}

function get_features_value(data){
    var out = new Object();
    var features = Object.keys(data[1]);
    var count = data.count;
    var value;

    var useless_features = ['Animal','Date','ID','ImgPath','Path','OtherImgPath','UnitNum','cluster'];
    features.forEach(function(item, index, arr) {
        if(useless_features.indexOf(item)!=-1) {
            arr.splice(index, 1);
        }
    });

    for(var k=0;k<features.length;k++){
        out[features[k]] = [];
    }

    for(var k=1;k<=count;k++){
        for(var j=0;j<features.length;j++){
            value = data[k][features[j]];
            if(value == '') value = '0';
            if(out[features[j]].indexOf(value)==-1){
                out[features[j]].push(value);
            }
        }
    }

    out['features'] = features;
    return out;
}

function get_filter(){
    var filter = new Object();
    filter['features'] = ['Animal','Date'];

    var Animal = [];
    var lstChk = document.getElementsByName( "select_checkbox_animal");
    for( var n = 0; n < lstChk.length; n++ )
    {
        if(lstChk[n].value != 'All' && lstChk[n].checked){
            Animal.push(lstChk[n].value);
        }
    }
    filter['Animal']=Animal;

    var Date = [];
    var lstChk = document.getElementsByName( "select_checkbox_date");
    for( var n = 0; n < lstChk.length; n++ )
    {
        if(lstChk[n].value != 'All' && lstChk[n].checked){
            Date.push(lstChk[n].value);
        }
    }
    filter['Date']=Date;
    console.log(filter);

    return filter
}

function get_filtered_data(data){
    var filter = get_filter();
    var out = [];
    var count = data.count;
    var features = filter.features;
    var value;
    for(var k=1;k<=count;k++){
        var pass = true;
        for(var j=0;j<features.length;j++){
            value = data[k][features[j]];
            if(value == '') value = '0';
            if(features[j]=='Date') value = value.split(' ')[0];
            if(filter[features[j]].indexOf(value)==-1){
                pass = false;
                break;
            }
        }
        if(pass) out.push(data[k])
    }
    return out;

}

function refresh_date_options(animal_date){
    var animal_selected = [];
    var options = [];
    var lstChk = document.getElementsByName( "select_checkbox_animal");

    for( var n = 0; n < lstChk.length; n++ )
    {
        if(lstChk[n].value != 'All' && lstChk[n].checked){
            animal_selected.push(lstChk[n].value);
        }
    }
    console.log(animal_selected)
    for(var k=0;k<animal_selected.length;k++){
        for(var j=0;j<animal_date[animal_selected[k]].length;j++){
            if(options.indexOf(animal_date[animal_selected[k]][j])==-1){
                options.push(animal_date[animal_selected[k]][j]);
            }
        }
    }

    options.sort(function(a,b){
        return Date(a.split(' ')[0])-Date(b.split(' ')[0])
    })

    $(".date-options").remove();
    for(k=0;k<options.length;k++){
        $("#id_date_options").append($("<li></li>").attr("class","date-options").text(options[k]).prepend(
            $("<input>")
            .attr("type","checkbox")
            .attr("name","select_checkbox_date")
            .attr("onclick","chk_changed('date');")
            .attr("value",options[k])))
    }
    
}


// function loadDoc(url, cFunction) {
//     var xhttp;
//     xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log(xmlhttp.response)
//             cFunction(this);
//         }
//     };
//     xhttp.open("GET", url, true);
//     xhttp.send();
// }