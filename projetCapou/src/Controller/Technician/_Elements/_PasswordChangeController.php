<?php

namespace App\Controller\Technician\_Elements;

use App\Controller\MailerController;
use App\Form\ChangePasswordRequestFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Loader\FilesystemLoader;
use Twig\Environment;
use Symfony\Bridge\Twig\Mime\BodyRenderer;

#[Route('/technician')]
class _PasswordChangeController extends AbstractController
{
    private $mailerController;
    private $entityManager;
    
    public function __construct(EntityManagerInterface $entityManager, MailerController $mailerController)
    {
        $this->entityManager = $entityManager;
        $this->mailerController  = $mailerController;
    }    
    
    #[Route('/password/change', name: 'app_technician_password_change')]
    public function index(Request $request, UserPasswordHasherInterface $userPasswordHasher): Response
    {
        $firstName=$this->getUser()->getFirstName();
        $lastName=$this->getUser()->getLastName();
        $user=$this->getUser();
        
        $form = $this->createForm(ChangePasswordRequestFormType::class);
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            if(password_verify($form->get('oldPassword')->getData(), $user->getPassword())){                
                $encodedPassword = $userPasswordHasher->hashPassword(
                    $user,
                    $form->get('plainPassword')->getData()
                );
                
                $user->setPassword($encodedPassword);
                $this->entityManager->flush();
                
                $email = $this->mailerController->emailChangePassword($user);
                $loader = new FilesystemLoader('..\templates');
                $twig = new Environment($loader);
                
                $renderer = new BodyRenderer($twig);
                $renderer->render($email);
                $this->mailerController->emailSend($email);

                $this->addFlash('success', 'Votre mot de passe a bien été changé !');
            }
            else{
                $this->addFlash('error', 'Le mot de passe actuel rentré est erroné !');
            } 
        }

        return $this->render('roles/technician/_elements/_changePassword.html.twig', ['firstname' => $firstName, 'lastname' => $lastName, 'resetForm' => $form->createView()]);
    }
}
