<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LoginUserController extends AbstractController
{
    #[Route('/login/user', name: 'login_user')]
    public function index(): Response
    {
        return $this->render('login_user/index.html.twig', [
            'controller_name' => 'LoginUserController',
        ]);
    }
}
