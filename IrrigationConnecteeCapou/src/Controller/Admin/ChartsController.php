<?php

namespace App\Controller\Admin;

use App\Entity\Measure;
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
    public function sendWaterConsumption (): Response
    {
        $measureObjects = $this->doctrine->getRepository(Measure::class)->findBy(array('measureType' => '2'));
        $measureCoordinate = array();
        
        foreach($measureObjects as $measureObject){
            array_push($measureCoordinate, array("idMeasure" => $measureObject->getId(),
                                                 "valMeasure" => $measureObject->getValue()
            ));
        }
        return new JsonResponse($measureCoordinate);
    }   
}