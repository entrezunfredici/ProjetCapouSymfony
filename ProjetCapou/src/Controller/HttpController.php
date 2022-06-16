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
use App\Entity\Card;
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
        return $this->render('http/index.html.twig', [
            'controller_name' => 'HttpController',
        ]);
    }
    
    #[Route('/bdd/vanneState/', name: 'app_vanneState')]
    public function vanneState(): Response
    {
        $valves = $this->doctrine->getRepository(Valve::class)->findAll();

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
        
        $this->logger->info("========== Date ==========");
        $date = date('Y-m-d');
        $this->logger->info($date);
        
        $this->logger->info("========== Heure ==========");
        $heure = date('H:i:s');
        $this->logger->info($heure);
        
        $request = Request::createFromGlobals();
        $content = $request->getContent();
        
        $this->logger->info("========== Trame ==========");
        $this->logger->info($content);
        
        $measure = strval($content);
        
//         $substr = substr($measure, 5, 7);
//         $explode = strtok($measure, ',:');
//         $this->logger->info("substr");
//         $this->logger->info($substr);

//         $test = json_decode($content, true);
//         $data = $test->latitude;
//         $this->logger->info($data);
                
//         $data = [];
//         $data = json_decode($request->getContent(), true);
//         $this->logger->info($data);

//         $this->logger->info("content");
//         $this->logger->info($content);

//         $this->logger->info("test");
//         $this->logger->info($test);
//         $this->logger->info($measure[7]);
        
        $explode = explode(',', $measure);
        
        for($i=0; $i <= 6; $i++){
            if($i == 0){
                $token = strtok($explode[$i], '"');
                while($token !== false){
                    for($m = 0; $m <= 3; $m++){
                        $token = strtok('"');
                        if($m == 2){
                            $node_id = $token;
                        }
                    }
                }
            }
            else{
                $token = strtok($explode[$i], ',:');
                $m=0;
                while($token !== false){
                    $token = strtok(',:}');
                    if(($m % 2)==0){
                        if($i == 1){
                            $latitude = $token;
                        }
                        if($i == 2){
                            $longitude = $token;
                        }
                        if($i == 3){
                            $extTemp = $token;
                        }
                        if($i == 4){
                            $extHum = $token;
                        }
                        if($i == 5){
                            $intTemp = $token;
                        }
                        if($i == 6){
                            $intHum = $token;
                        }
                    }
                    $m++;
                }
                
            }
        }
        
        $this->logger->info("========== Token ==========");
        $this->logger->info($node_id);
        
        $test = $this->doctrine->getRepository(Card::class)->findOneBy(array('lora' => $node_id));
        $this->logger->info($test->getLora());
        
//         if($test = $entite)){
//             $this->logger->info($test);
//         }
        
        
//         $this->logger->info($node_id);
        
        
//         $request->request->replace(is_array($data) ? $data : array());

//         $this->logger->info($json);
//         $this->logger->info($data);
        
        return $this->render('http/receiveData.html.twig');
                
    }
}