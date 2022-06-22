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
use App\Entity\Card;
use Doctrine\Persistence\ObjectManager;
use App\Entity\MeasureType;
use App\Entity\Measure;
use App\Entity\State;
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
    
    #[Route('/bdd/valveState/', name: 'app_valveState')]
    public function vanneState(): Response
    {
        $valveObjects = $this->doctrine->getRepository(Valve::class)->findAll();
        $cardObjects = $this->doctrine->getRepository(Card::class)->findAll();

        $valveData = array();
        foreach($valveObjects as $valveObject){
            array_push($valveData, array("loraCard" => $valveObject->getCard()->getLora(),
                "valveState" => $valveObject->getState()
            ));
        }
        
        return new JsonResponse($valveData);
        
    }
    
    #[Route('/bdd/receiveData', name: 'app_receiveData')]
    public function receiveData(): Response
    {
        
        $manager = $this->doctrine->getManager();
        
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
                    $token = strtok(',:} ');
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
        
//         $cardObjects = $this->doctrine->getRepository(Card::class)->findOneBy(['lora' => "0x25"]);
        $cardObjects = $this->doctrine->getRepository(Card::class)->findAll();
        $measureTypeObjects = $this->doctrine->getRepository(MeasureType::class)->findAll();
        $stateObjects = $this->doctrine->getRepository(State::class)->findAll();

        $finalCard = 0;
        foreach($cardObjects as $cardObject){
            if($cardObject->getLora() == $node_id){
                $finalCard = $cardObject;
                $this->logger->info($latitude.",".$longitude);
                $cardObject->setLocation($latitude.",".$longitude);
                
                foreach($measureTypeObjects as $measureTypeObject){
                    if($measureTypeObject->getType() == 'temperature_air'){
                        $measureTempExt = new Measure();
                        $measureTempExt->setDate($date);
                        $measureTempExt->setTime($heure);
                        $measureTempExt->setGps($latitude.",".$longitude);
                        $measureTempExt->setValue($extTemp);
                        $measureTempExt->setMeasureType($measureTypeObject);
                        $measureTempExt->setCardId($cardObject);
                    }
                    if($measureTypeObject->getType() == 'taux_humidite_air'){
                        $measureHumExt = new Measure();
                        $measureHumExt->setDate($date);
                        $measureHumExt->setTime($heure);
                        $measureHumExt->setGps($latitude.",".$longitude);
                        $measureHumExt->setValue($extHum);
                        $measureHumExt->setMeasureType($measureTypeObject);
                        $measureHumExt->setCardId($cardObject);
                    }
                    if($measureTypeObject->getType() == 'temperature_sol'){
                        $measureTempInt = new Measure();
                        $measureTempInt->setDate($date);
                        $measureTempInt->setTime($heure);
                        $measureTempInt->setGps($latitude.",".$longitude);
                        $measureTempInt->setValue($intTemp);
                        $measureTempInt->setMeasureType($measureTypeObject);
                        $measureTempInt->setCardId($cardObject);
                    }
                    if($measureTypeObject->getType() == 'taux_humidite_sol'){
                        $measureHumInt = new Measure();
                        $measureHumInt->setDate($date);
                        $measureHumInt->setTime($heure);
                        $measureHumInt->setGps($latitude.",".$longitude);
                        $measureHumInt->setValue($intHum);
                        $measureHumInt->setMeasureType($measureTypeObject);
                        $measureHumInt->setCardId($cardObject);
                    }
                }

                $manager->persist($measureTempExt);
                $manager->persist($measureHumExt);
                $manager->persist($measureTempInt);
                $manager->persist($measureHumInt);
                
                $manager->flush();
            }
        }
        if($finalCard == 0){
            $card = new Card();
            $card->setLora($node_id);
            $card->setDate($date);
            $card->setFunction('Esclave');
            $card->setLocation($latitude.",".$longitude);
            foreach($stateObjects as $stateObject){
                if($stateObject->getDescription() == "Fuga."){
                    $card->setState($stateObject);
                }
            }
            $manager->persist($card);
            $manager->flush();
            
            foreach($measureTypeObjects as $measureTypeObject){
                if($measureTypeObject->getType() == 'temperature_air'){
                    $measureTempExt = new Measure();
                    $measureTempExt->setDate($date);
                    $measureTempExt->setTime($heure);
                    $measureTempExt->setGps($latitude.",".$longitude);
                    $measureTempExt->setValue($extTemp);
                    $measureTempExt->setMeasureType($measureTypeObject);
                    $measureTempExt->setCardId($card);
                }
                if($measureTypeObject->getType() == 'taux_humidite_air'){
                    $measureHumExt = new Measure();
                    $measureHumExt->setDate($date);
                    $measureHumExt->setTime($heure);
                    $measureHumExt->setGps($latitude.",".$longitude);
                    $measureHumExt->setValue($extHum);
                    $measureHumExt->setMeasureType($measureTypeObject);
                    $measureHumExt->setCardId($card);
                }
                if($measureTypeObject->getType() == 'temperature_sol'){
                    $measureTempInt = new Measure();
                    $measureTempInt->setDate($date);
                    $measureTempInt->setTime($heure);
                    $measureTempInt->setGps($latitude.",".$longitude);
                    $measureTempInt->setValue($intTemp);
                    $measureTempInt->setMeasureType($measureTypeObject);
                    $measureTempInt->setCardId($card);
                }
                if($measureTypeObject->getType() == 'taux_humidite_sol'){
                    $measureHumInt = new Measure();
                    $measureHumInt->setDate($date);
                    $measureHumInt->setTime($heure);
                    $measureHumInt->setGps($latitude.",".$longitude);
                    $measureHumInt->setValue($intHum);
                    $measureHumInt->setMeasureType($measureTypeObject);
                    $measureHumInt->setCardId($card);
                }
            }
            $manager->persist($measureTempExt);
            $manager->persist($measureHumExt);
            $manager->persist($measureTempInt);
            $manager->persist($measureHumInt);
            
            $manager->flush();
        
        }
        
//             if(($cardObject->getLora() != $node_id) && ()){
                
                
        
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