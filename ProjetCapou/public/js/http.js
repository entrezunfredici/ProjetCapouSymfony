//AjaxCall();
//var idInter = setInterval(AjaxCall, 500000);//Set Interval 3s Between Each Call
//
//function HttpCall(){
//	$.get(
//		'/bdd/receivData/',	//Get URL
//		'false',
//	    			//Call Function
//		'json'					//Type of File
//	)
//}

//https://jsonplaceholder.typicode.com/users/2

//var xhr = new XMLHttpRequest();
//xhr.open('GET', '/bdd/receivData/');
//xhr.onreadystatechange = function() {
//  if (xhr.readyState === 4) {
//    alert(xhr.responseText);
//  }
//};
//xhr.send();

//$("#data").on('click', function(e){
//	e.preventDefault();
//	let formData = $('#ajaxResquest').deserialize();
//	  $.get({
//	    url: '{{path('/bdd/receivData/')}}',
//	    data: formData,
//	    dataType: 'json',
//	    success: onSuccess,
//	    error: onError,
//	  });
//});

//fetch("http://10.100.0.13:8000/bdd/receivData/")	
//  .then(function(res) {
//    if (res.ok) {
//      return res.json();
//    }
//  })
//  .then(function(value) {
//    console.log(value);
//  })
//  .catch(function(err) {
//    // Une erreur est survenue
//  });
  
//fetch("http://10.100.0.13:8000/bdd/receivData/")
//.then(response => response.json())
//.then(response => alert(JSON.stringify(response)))
//.catch(error => alert("Erreur : " + error));

//fetch('http://10.100.0.13:8000/bdd/receivData/')
//.then( rep => 
//	{
//		if (rep.ok === true) 
//			rep.json().then(data => console.log(data));
//	}
//);

//function webRequest() {
//  let url = "http://10.100.0.13:8000/bdd/receivData/"; // This is a hypothetical URL.
//  return new Promise(function (resolve, reject) {
//    fetch(url)
//      .then(function (response){
//        return response.json();
//        }
//      )
//      .then(function (json) {
//        resolve(JSON.stringify(json.names));
//      })
//  })
//}

async function getStarCount(userName: string, repoName: string) {

  const url = "http://10.100.0.13:8000/bdd/receivData/" + userName + "/" + repoName;

  let xhttp = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState !== 4) return;

      if (xhttp.status == 200) {
        resolve(JSON.parse(xhttp.responseText).watchers_count);
      } else {
        reject({
          status: xhttp.status,

          statusText: xhttp.statusText
        });
      }
    };

    xhttp.open("GET", url, true);

    xhttp.send();
  });
}

//var xhr = new XMLHttpRequest(); 
//xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/1');
//xhr.onreadystatechange = function() {
//  if (xhr.readyState === 4) {
//    alert(xhr.responseText);
//  }
//};
//xhr.send();

