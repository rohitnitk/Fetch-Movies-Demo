/* A file containing various functions
Author: Rohit
*/

const ApiKey = '28de8018';
const JUMP = 5;
var index = 0;
var Data =null;
var node = document.getElementById('page');
var pageCount=0;
var IndexArr = [{nextIndex:null}];
IndexArr.pop();

function FetchMovies(){
  
  setMessage('message', '<div class="loader"></div>' )
  ShowEle('message');

  var query = (document.getElementById('search').value);

    deleteNodeChild(node);  

    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if(request.readyState !==4){
        return ;
      }

      if(request.status == 200){
        
        Data = JSON.parse((request.responseText));
       
        if(Data.Response == 'False'){
        
          setMessage('message', 'There are no Movies found for search :'+ ' ' +  '<b>' + query );
          ShowEle('message');
        
         }
      
      else{
              HideEle('message');
              Data = Data.Search;
              IndexArr.push({nextIndex:0});

              ShowEle('pagination');
           
              for(let i=0; i<Math.min(JUMP, Data.length); i++) {
                  AppendList(Data[i]);
                  index = i+1;
           
                }
                IndexArr.push({nextIndex:index});
                SetResultCount('count');
                ShowEle('count');
                pageCount++;

        }
        
      }
      else {

            setMessage('message', '<h3>Something went wrong, Check your Connection and try again...</h3>') ;
            ShowEle('message');
            HideEle('count');
           }
    
    }
		
    var URL = 'https://www.omdbapi.com/?apikey='+ ApiKey + '&s=' + query  ;

    request.open('GET', URL);
    try{
      request.send();
    } catch(err){
      alert(err);
    }
	}


  function deleteNodeChild(node) {

    var first = node.firstElementChild; 
        while (first) { 
            first.remove(); 
            first = node.firstElementChild; 
        }     // body...
  }

  function paginateNext() {
      HideEle('message');
       deleteNodeChild(node);
       
       if(IndexArr.length ==0)
        IndexArr.push({nextIndex: 0});
       var first = IndexArr[IndexArr.length-1].nextIndex;

    if(first == Data.length){

      setMessage('message', '<h3>You have reached End of list</h3>' ) ;
      ShowEle('message');
      HideEle('count');
     
      return;
    }

    else{
      

    for(let i=first; i<Math.min(first+JUMP, Data.length); i++){
      
        AppendList(Data[i]);
        index = i+1;
       }

       IndexArr.push({nextIndex:index});
    }
    SetResultCount('count');
    ShowEle('count');
    

  }

  function paginatePrev() {
   
      deleteNodeChild(node);
      HideEle('message');
     
      IndexArr.pop();
      if(IndexArr.length ==0){

         setMessage('message', '<h3>Oh! That was the first page..</h3>') ;
         ShowEle('message');
         HideEle('count');
         return;
      }
      else{
              

        var first = IndexArr[IndexArr.length-1].nextIndex;
        for(let i=first; i<Math.min(first+JUMP, Data.length); i++){
            AppendList(Data[i]);
            index = i+1;
          }
        SetResultCount('count');
        ShowEle('count');
      }

      

  }

  /**/
function ShowEle(Id) {

  var x = document.getElementById(Id);
    x.style.display = "block";
}

function HideEle(Id) {
var x = document.getElementById(Id);
    x.style.display = "none"; 
}


function ValidateIndex(index) {
  if(index < Data.length)
    return true;
  return false;
}

function AppendList(data) {
   var div = document.createElement('div');
       div.className = 'ResultNode';
       div.innerHTML = '<div class = "portrait">' + '<img src="' + data.Poster +'"' + 'alt="Poster" >' +'</div>' +'<div class="details">' + '<h3>'+  data.Title +'</h3>' +' '+ '<h3>'+ data.Year + '</h3>' +'</div>' 
       node.appendChild(div);
}

function setMessage(Id, message){

var x = document.getElementById(Id);
x.innerHTML = message;
}


function SetResultCount(Id){
  var x = document.getElementById(Id);
  x.innerHTML = 'Showing'+ ' '+ '<b>' + index + '</b>' +  ' ' + 'of' + ' ' + '<b>'+ Data.length +'</b>' ; 
}


/*function DisableButton(button){
        var Button = document.getElementById(button);
     Button.disabled == true;
  }

  function EnableButton(button){
    var Button = document.getElementById(button);
   
      Button.disabled = false;
    }
  
*/
