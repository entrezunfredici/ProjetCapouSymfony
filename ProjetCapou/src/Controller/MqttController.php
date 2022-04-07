<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MqttController extends AbstractController
{
    #[Route('/mqtt', name: 'app_mqtt')]
    public function index(): Response
    {
        return $this->render('mqtt/index.html.twig', [
            'controller_name' => 'MqttController',
        ]);
    }
}
