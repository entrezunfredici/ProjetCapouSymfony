<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Plot;
use Symfony\Component\HttpFoundation\JsonResponse;

class TestMapController extends AbstractController
{
    private $doctrine;
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    #[Route('/test/map', name: 'app_test_map')]
    public function index(ManagerRegistry $doctrine, EntityManagerInterface $entityManager): Response
    {   
        
        $user = $this->getUser()->getId();
        dump($user);
        die();
        
        $plotObject = $this->doctrine->getRepository(Plot::class)->findOneBy(array('name'=>'Parcelle A'));
        $JsonParser = file_get_contents('upload/plots/'.$plotObject->getFilePath());
        $myarray = json_decode($JsonParser, true);
        
        return new JsonResponse($myarray);
//         return $this->render('test_map/index.html.twig');
    }
}
