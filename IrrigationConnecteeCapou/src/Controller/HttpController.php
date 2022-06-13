<?php

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpClient\NoPrivateNetworkHttpClient;
use App\Entity\Valve;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Serializer\NameConverter\NameConverterInterface;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use App\Entity\Measure;
// use Symfony\Component\DependencyInjection\ParameterBagInterface;
// use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class HttpController extends AbstractController
{
    private $doctrine;
    private LoggerInterface $logger;
    
    public function __construct(ManagerRegistry $doctrine, LoggerInterface $logger)
    {
        $this->doctrine = $doctrine;
        $this->logger = $logger;
    }
    
    #[Route('/http', name: 'app_http')]
    public function index(Request $request): Response
    {
//         $client = HttpClient::create();
    
//         $response = $client->request('GET', 'http://127.0.0.1:8000');
        
//         dump($client);
//         die();

//         $request = Request::createFromGlobals();
//         $request->server->get('HTTP_HOST');
//         $request->get('content-type');
//         dd($request);

//         $request = $request->server->get('HTTP_HOST');
//         $request = $request->server->get('HTTP_POST');
//         $request->server->get('HTTP_HOST');
//         echo $request;
        
//         $uri = $_SERVER['REQUEST_URI'];
//         echo $uri;
//         echo $request;
//         $test = $request->getMethod();    // e.g. GET, POST, PUT, DELETE or HEAD

//         $test = $request->server->get('content-type');
//         $test = $request->query->all();
//         dd($test);
//         echo $test;
//         echo $request;
//         echo $test;  
        
//         $content = $request->getContent();
//         $content = $request->server->getHeaders();

        
//         $response = new Response();
//         echo $response;
//         $response->send();
//         $content = $request->getPathInfo();
//         $content = $request->getContent();
//         echo $content;
//         $response = new RedirectResponse('http://example.com/');
//         $response->send();

//         $data = $request->toArray();
//         echo $data;
        
        
//         $response = $request->request->get('GET', 'http://127.0.0.1:8000', [
//             'headers' => [
//                 'Accept' => 'application/json',
//             ],
//         ]);

//         echo $response;
        
//         $response = $client->request('POST', 'https://127.0.0.1:8000', [
//         $response = $request->request->get('POST', $request->getPathInfo(), [
//             'json' => ['param1' => 'value1', '...'],
//         ]);
        
//         $decodedPayload = $response->toArray();
        
//         echo $response;
        
        return $this->render('http/index.html.twig', [
            'controller_name' => 'HttpController',
        ]);
    }
    
    #[Route('/bdd/vanneState/', name: 'app_vanneState')]
    public function vanneState(): Response
    {
        $valves = $this->doctrine->getRepository(Valve::class)->findAll();

//         dump($valve);
        
        $valveData = array();
        foreach($valves as $valve){
            array_push($valveData, array("idValve" => $valve->getId(),
                "valveState" => $valve->getState()
            ));
        }
        
        return new JsonResponse($valveData);
        
    }
    
    #[Route('/bdd/receiveData', name: 'app_receiveData')]
    public function receiveData(): Response
    {
        
//         $response = new RedirectResponse('http://example.com/');
//         $response->send();
//             echo "<h1>test</h1>";

//         echo $request;
        
        $request = Request::createFromGlobals();
//         echo $request;
        $path = $request->getPathInfo();
//         echo $path;
        
        $content = $request->getContent();
//         echo $content;
        
        $type = $request->getContentType();
//         $measure = json_decode($content, true);
//         echo $measure->longitude;
        
//         $encoders = array(new XmlEncoder(), new JsonEncoder());
//         $normalizers = array(new GetSetMethodNormalizer());
        
//         $serializer = new Serializer($normalizers, $encoders);
        
//         $measure = $serializer->deserialize($content, Measure::class, 'json');
//         echo $measure;
        
        
//         $nameConverter = new HttpController($this->doctrine, $this->logger);
        
//         $normalizer = new ObjectNormalizer(null, $nameConverter);
        
//         $serializer = new Serializer([$normalizer], [new JsonEncoder()]);

//         $serializer = new Serializer();
        
//         $json = $serializer->deserialize($content, Measure::class, 'xml');

//         $encoders = array(new JsonEncoder());
//         $normalizers = array(new GetSetMethodNormalizer());
        
//         $serializer = new Serializer($normalizers, $encoders);
        
//         $json = $serializer->serialize($content, 'json');
        
//         $data = json_decode($json, true);
        
        $this->logger->info($path);
        $this->logger->info($content);
        
//         $data = [];
//         $data = json_decode($request->getContent(), true);
        $this->logger->info($type);
//         $this->logger->info($measure);
        
//         $request->request->replace(is_array($data) ? $data : array());
//         $this->logger->info($data);

//         $this->logger->info($json);
//         $this->logger->info($data);
        
        return $this->render('http/receiveData.html.twig');
        
//         $client = HttpClient::create();
        
//         $response = $client->request('GET', 'https://symfony-com.translate.goog/doc/current/http_client.html?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=sc');
//         $response = $client->request('GET', 'http://10.100.0.155:8000/bdd/receivData/');
//         $response = $client->request('GET', 'http://10.100.0.4:8000/bdd/receivData/');
//         $response = $client->request('GET', 'http://10.100.0.4:8000/bdd/vanneState/');
        
//         $content = $response->getContent();
//         $data = json_decode($content);
//         dump($data);
//         die();
//         die();
//         dump($response);
//         $statusCode = $response->getStatusCode();
//         dump($statusCode);
//         $content = $response->toArray();
//         dump($content);
//         $response = $client->request('GET', 'http://127.0.0.1:8000/bdd/vanneState');

//         return $this->render('http/receiveData.html.twig', ['title' => $data->node_id[0][0]]);

//         $curl= curl_init();
//         curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
//         curl_setopt($curl, CURLOPT_URL, 'http://10.100.0.4:8000/bdd/receivData/');
//         $res = curl_exec($curl);
//         curl_close($curl);
//         $result = file_get_contents('http://10.100.0.4:8000/bdd/receivData/');
//         $array = json_decode($result, true);
//         var_dump($array);
//         die();
//         $jo = json_decode($res);
//         echo $jo;
        
//         $url = 'http://10.100.0.4:8000/bdd/receivData/';
//         $json = file_get_contents($url);
//         $data = json_decode($json);
//         echo $data->node_id;
//         dump($json);
//         die();
//         echo $json;

        
//         $file_json = file_get_contents($url);  //"fichier.json"
//         $parsed_json = json_decode($file_json);  
        
//         $json = file_get_contents('http://10.100.0.13:8000/bdd/vanneState/');
//         $data = json_decode($json, true);
        
//         dump($data);

//         $result = file_get_contents('http://10.100.0.13:8000/bdd/receivData/');
//         $array = json_decode($result, true);
//         var_dump($array);
        
//         $request = new Request();
//         $request->create('http://10.100.0.13:8000/bdd/receivData/', 'GET');
//         dump($request);

//         $em = $this->doctrine->getManagers();
//         $data = $request->request->all();
//         dump($data);

//         $json = file_get_contents('https://jsonplaceholder.typicode.com/users/2');
//         $data = json_decode($json, true);

//         $data = json_decode($request->getContent(), true);
//         dump($data);
//         die();

//         $data = $request->createFromGlobals($_POST, $_COOKIE, $_FILES, $_SERVER);
//         dump($data);
//         die();

//         $request = $request->server->get('HTTP_POST');

//         $data = $request->toArray();
//         $dataDecode = json_decode($request->getContent(), true);
//         dd($data);

//         $request = Request::createFromGlobals();
        
//         $content = $request->getContent();
//         $data = $request->getContent()->toArray();
        
//         dd($data);

//         $var = $request->request->all();
//         dd($var);
        
//         $data = $request->getContent();
//         dd($data);
//         return new Response($data);
        
//         return $this->render('http/receiveData.html.twig');

//         $encoders = [new JsonEncoder()];
//         $normalizers = [new ObjectNormalizer()];
        
//         $serializer = new Serializer($normalizers, $encoders);
        
//         $request = Request::createFromGlobals();
//         $request->server->get('HTTP_POST');
//         $request->headers->get('content-type');
//         $request->getContent();
//         dd($request);
        
//         $serializer->deserialize($request, $request, $request);
        
//         $data = json_decode($request->getContent(), true);
        
//         if(json_last_error() !== JSON_ERROR_NONE){
//             return false;
//         }
//         if($data === null){
//             return false;
//         }
//         $request->request->replace($data);
        
//         dump($request);
//         die();
        
//         return new JsonResponse();

//         $uri = $_SERVER['REQUEST_URI'];
        
//         header('Content-Type: text/html');
//         echo 'The URI requested is: '.$uri;

//         $request = Request::createFromGlobals();
//         $request->server->get('HTTP_HOST');
//         $request->get('content-type');
//         dd($request);
//         $response = new Response();
        
//         $request->getContent('content');
//         $response->setContent('<html><body><h1>Hello world!</h1></body></html>');
//         $response->headers->set('Content-Type', 'text/html');

//         $response->send();
        
//         dd($response);

//         $data = json_decode($request->getContent(), true);
//         dd($data);
        
//         $request->headers->get('host');
//         $request->headers->get('content-type');

//         $request = $request->getContent();
//         $data = $request->toArray();
//         dd($data);

        
//         $uri = $_SERVER['REQUEST_URI'];
        
//         echo 'The URI requested is: '.$uri;
        
//         $data = $request->server->get('HTTP_HOST');
//         dd($data);

//         $request = Request::createFromGlobals();
//             $content = $request->getContent();
//             dd($content);
//         for ($i = 0; $i < 10;) {
            
//         }
//         dd($request);
//         echo $request;

//         $test = $request->getMethod();    // e.g. GET, POST, PUT, DELETE or HEAD
        
        
        
//         return $this->render('http/receiveData.html.twig', [
//             'test' => $test,
//             'content' => $content,
//         ]);

//         echo $test;     
        
//         return $this->render('http/receiveData.html.twig');
        
    }
}