<?php

/*============================================================================
    Name        : ChartsController.php
    Path	    : src/Controller/Administrator
    Author      : BTS SNIR, Lycée Antoine Bourdelle
    Description : Administrator's charts control
    Date 	    : 2022
 ============================================================================*/

namespace App\Controller\Administrator;

use App\Entity\Measure;
use App\Entity\Plot;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin')]
class ChartsController extends AbstractController
{
    private $doctrine;
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    
    #[Route('/charts', name: 'app_admin_charts')]
    public function sendMeasures (): Response 
    {
        $measureObjects = $this->doctrine->getRepository(Measure::class)->findAll();

        $measureCoordinate = array();
        foreach($measureObjects as $measureObject){
            if($measureObject->getCardId()!=null){
                $cardsMeasure = $measureObject->getCardId()->getPlotId()->getId();
            }
            else{$cardsMeasure = null;}
            
            array_push($measureCoordinate, array("idMeasure" => $measureObject->getId(),
                                                 "valMeasure" => $measureObject->getValue(),
                                                 "measureType" => $measureObject->getMeasureType()->getType(),
                                                 "cardsMeasure" => $cardsMeasure,
                                                 "timeMeasure" => $measureObject->getTime()
            ));
        }
        return new JsonResponse($measureCoordinate);
    }
    
    #[Route('/idPlots', name: 'app_admin_idPlots')]
    public function sendIdPlot (): Response
    {
        $measureObjects = $this->doctrine->getRepository(Plot::class)->findAll();
        $measureCoordinate = array();
        foreach($measureObjects as $measureObject){
            array_push($measureCoordinate, array("idPlot" => $measureObject->getId()));
        }
        return new JsonResponse($measureCoordinate);
    }
}