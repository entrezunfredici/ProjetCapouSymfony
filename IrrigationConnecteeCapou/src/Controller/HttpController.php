<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpClient\NoPrivateNetworkHttpClient;
use App\Entity\Valve;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;

class HttpController extends AbstractController
{
    private $doctrine;
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    
    #[Route('/http', name: 'app_http')]
    public function index(): Response
    {
        $client = HttpClient::create();
    
//         $response = $client->request('GET', 'http://127.0.0.1:8000');
        
//         dump($client);
//         die();
        
        return $this->render('http/index.html.twig', [
            'controller_name' => 'HttpController',
        ]);
    }
    
    #[Route('/bdd/vanneState/', name: 'app_vanneState')]
    public function vanneState(): Response
    {
        $client = HttpClient::create();
        
        //         $response = $client->request('GET', 'http://127.0.0.1:8000');
        
        //         dump($client);
        //         die();
        
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
    
    #[Route('/bdd/receivData/', name: 'app_receiveData')]
    public function receiveData(): Response
    {
        $client = HttpClient::create();
        
//         $response = $client->request('GET', 'https://symfony-com.translate.goog/doc/current/http_client.html?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=sc');
        $response = $client->request('GET', 'http://10.19.46.7:8000/bdd/vanneState/');
        $content = $response->getContent();
        $data = json_decode($content);
//         dump($data);
//         die();
        
//         $response = $client->request('GET', 'http://127.0.0.1:8000/bdd/vanneState');

        return $this->render('http/receiveData.html.twig', ['title' => $data->node_id[0][0]]);
    }
}
