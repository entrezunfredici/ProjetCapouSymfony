<?php

/*============================================================================
    Name        : MapController.php
    Path	    : src/Controller/Administrator
    Author      : BTS SNIR, Lycée Antoine Bourdelle
    Description : Administrator's map control
    Date 	    : 2022
 ============================================================================*/

namespace App\Controller\Administrator\_Elements;

use App\Entity\Measure;
use App\Entity\Plot;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Card;

#[Route('/admin/map')]
class _MapController extends AbstractController
{
    private $doctrine;
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    
    #[Route('/picket', name: 'app_admin_map_picket')]
    public function sendStacketLocation(ManagerRegistry $doctrine, EntityManagerInterface $entityManager): Response
    {  
        $this->doctrine = $doctrine;
        
        $cardObjects = $this->doctrine->getRepository(Card::class)->findAll();
        $cardCoordinates = array();
        
        foreach($cardObjects as $cardObject){
            $coordinate = $this->DSMToDD($cardObject->getLocation());
            array_push($cardCoordinates, array("idStacket" => $cardObject->getId(),
                                               "latitude" => $coordinate["latitude"], 
                                               "longitude" => $coordinate["longitude"]
            ));
        }
        return new JsonResponse($cardCoordinates);
    }
    
    #[Route('/stacketAndPlot', name: 'app_admin_map_stacket_plot')]
    public function sendStacketAndPlot(ManagerRegistry $doctrine): Response
    {
        $this->doctrine = $doctrine;
        
        $cardObjects = $this->doctrine->getRepository(Card::class)->findAll();
        $cardCoordinates = array();
        $plotObjects = $this->doctrine->getRepository(Plot::class)->findAll();
        $plotCoordinate = array();
        
        foreach($cardObjects as $cardObject){
            $coordinate = $this->DSMToDD($cardObject->getLocation());
            array_push($cardCoordinates, array("idStacket" => $cardObject->getId(),
                "latitude" => $coordinate["latitude"],
                "longitude" => $coordinate["longitude"]
            ));
        }
        foreach($plotObjects as $plotObject){
            array_push($plotCoordinate, array("idPlot" => $plotObject->getId(),
                "filepath" => $plotObject->getFilepath()
            ));
        }
        return new JsonResponse(array($plotCoordinate, $cardCoordinates));
    }
    
//     #[Route('/plot', name: 'app_admin_map_plot')]
//     public function sendPlotCoordinates(ManagerRegistry $doctrine, EntityManagerInterface $entityManager): Response
//     {
//         $this->doctrine = $doctrine;
        
//         $plotObjects = $this->doctrine->getRepository(Plot::class)->findAll();
//         $plotCoordinate = array();
        
//         foreach($plotObjects as $plotObject){
//             array_push($plotCoordinate, array("idPlot" => $plotObject->getId(),
//                                               "filepath" => $plotObject->getFilepath()
//             ));
//         }
//         return new JsonResponse($plotCoordinate);
//     }
    
    /* *********************************************** Get Coordinate **************************************************** */
    private function DSMToDD($frameArray): array
    {
        $nmeaFrame = explode(",", $frameArray);
        
        $frameLatitude = floatval($nmeaFrame[0]);
        $frameLongitude = floatval($nmeaFrame[1]);
        
        return array("longitude" => $frameLongitude, "latitude" => $frameLatitude);
    }
    /* ******************************************************************************************************************* */
}