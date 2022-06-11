<?php

namespace App\Controller\Technician\_Elements;

use App\Form\ChangePasswordFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/technician')]
class _PasswordChangeController extends AbstractController
{
    private $entityManager;
    
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }    
    
    #[Route('/password/change', name: 'app_technician_password_change')]
    public function index(Request $request, UserPasswordHasherInterface $userPasswordHasher): Response
    {
        $firstName=$this->getUser()->getFirstName();
        $lastName=$this->getUser()->getLastName();
        $user=$this->getUser();
        
        $form = $this->createForm(ChangePasswordFormType::class);
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            // A password reset token should be used only once, remove it.
//             $this->resetPasswordHelper->removeResetRequest($token);
            
            // Encode(hash) the plain password, and set it.
            $encodedPassword = $userPasswordHasher->hashPassword(
                $user,
                $form->get('plainPassword')->getData()
                );
            
            $user->setPassword($encodedPassword);
            $this->entityManager->flush();
            
            // The session is cleaned up after the password has been changed.
//             $this->cleanSessionAfterReset();
            
            return $this->redirectToRoute('app_technician');
        }
        else{
            echo "non";
        }
        
        return $this->render('password_change/index.html.twig', ['firstname' => $firstName, 'lastname' => $lastName, 'resetForm' => $form->createView()]);
    }
}
