<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Measure;
use Doctrine\Persistence\ManagerRegistry;

class MapController extends AbstractController
{
    
    private $doctrine;
    
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    
//     #[Route('/admin/map', name: 'mapLastData')]
//     public function sendLocation(): Response
//     {
//         $doctrine = $this->doctrine->getManager();
//         $measureObjects = $doctrine->getRepository(Measure::class)->findAll();
//         $plotCoordinate = array();
        
//         foreach($measureObjects as $measureObject){
//             $dataArray = $measureObject->getId();
//             $dataObject = $dataArray->last();
//             $coordinate = $this->DSMToDD($dataObject->getGps());
//             array_push($plotCoordinate, array( "idMeasure" => $measureObject->getId(),
//                 "latitude" => $coordinate["latitude"],
//                 "longitude" => $coordinate["longitude"]));
//         }
//         return new JsonResponse($plotCoordinate);

//     }
    
    #[Route('/admin/map', name: 'mapLastData')]
    public function sendLocation(): Response
    {
        if(!isset($_GET["idMeasure"])) return new Response(Response::HTTP_NOT_FOUND);
        
        $doctrine = $this->getDoctrine()->getManager();
        $measureObjectId = $doctrine->getRepository(Measure::class)->findOneById($_GET["idMeasure"]);
        $measureCoordinate = array();
        
        foreach($measureObjectId->getIdData() as $dataObject) {
            $coordinate = $this->DSMToDD($dataObject->getNmea());
            array_push($measureCoordinate, array( "idMeasure" => $measureObjectId->getId(),
                "latitude" => $coordinate["latitude"],
                "longitude" => $coordinate["longitude"]
                
            ));
        }
        return new JsonResponse($measureCoordinate);
    }
    
    /* *********************************************** Get Coordinate **************************************************** */
    
    private function DSMToDD($frameArray): array
    {
        $nmeaFrame = explode(",", $frameArray);
        
        $frameLatitude = floatval($nmeaFrame[1]);
        $frameLongitude = floatval($nmeaFrame[2]);
        
//         $degreeLatitude = ($frameLatitude / 100) % 100;
//         $minuteLatitude = ($frameLatitude % 100);
//         $secondLatitude = ($frameLatitude - ($frameLatitude % 10000));
//         $latitude = ($degreeLatitude + ($minuteLatitude / 60) + ($secondLatitude * 60 / 3600));
        
//         $degreeLongitude = (($frameLongitude / 100) % 1000);
//         $minuteLongitude = ($frameLongitude % 100);
//         $secondLongitude = ($frameLongitude - ($frameLongitude % 10000));
//         $longitude = ($degreeLongitude + ($minuteLongitude / 60) + ($secondLongitude * 60 / 3600));
        
//         if($nmeaFrame[3] == 'S'){
//             $latitude = -$latitude;
//         };
//         if($nmeaFrame[5] == 'O'){
//             $longitude = -$longitude;
//         };
        
        return array("longitude" => $frameLongitude, "latitude" => $frameLatitude);
    }
    /* ******************************************************************************************************************* */
}
