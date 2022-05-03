<?php

/*============================================================================
    Name        : UserCrudController.php
    Path	    : src/Controller/Administrator/Crud
    Author      : BTS SNIR, Lycée Antoine Bourdelle
    Description : User's actions control
    Date 	    : 2022
 ============================================================================*/

namespace App\Controller\Administrator\Crud;

use App\Controller\MailerController;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TelephoneField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Bridge\Twig\Mime\BodyRenderer;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use EasyCorp\Bundle\EasyAdminBundle\Field\ColorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use Faker\Factory;
use Symfony\Component\Routing\Annotation\Route;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class UserCrudController extends AbstractCrudController
{
    private $encoder, $mailerController;
    private LoggerInterface $logger;
    private RequestStack $requestStack;
    
    public function __construct(UserPasswordHasherInterface $encoder, MailerController $mailerController, LoggerInterface $logger, RequestStack $requestStack)
    {
        $this->encoder = $encoder;
        $this->mailerController  = $mailerController;
        $this->logger = $logger;
        $this->requestStack = $requestStack;
    }
    
    public static function getEntityFqcn(): string
    {
        return User::class;
    }
    
    public function configureCrud(Crud $crud): Crud
    {
        return $crud->setEntityLabelInPlural('Utilisateurs')
                    ->setEntityLabelInSingular('Utilisateur')
                    ->setPageTitle('index', 'Liste des %entity_label_plural%')
                    ->setPageTitle('edit', fn (User $user) => sprintf('Éditer "%s %s"', $user->getFirstName(), $user->getLastName()))
                    ->setPageTitle('new', 'Ajouter un %entity_label_singular%');
    }

    public function configureFields(string $pageName): iterable
    {
        
        $roles = [
            'Technician' => 'ROLE_TECHNICIAN',
            'Administrator'  => 'ROLE_ADMIN'
        ];

        return [
            IdField::new('id', 'Identifiants')->hideOnForm(),
            TextField::new('firstName', 'Prénom')->setRequired(1),
            TextField::new('lastName', 'Nom')->setRequired(1),
            EmailField::new('email', 'Adresse e-mail')->setFormType(EmailType::class)->setHelp('ex: jean-dupont@gmail.com'),
            TelephoneField::new('phone_number', 'Téléphone')->setFormType(TelType::class),
            TextField::new('address', 'Adresse')->setHelp('ex: 8 rue Laplace'),
            TextField::new('city', 'Ville'),
            TextField::new('zipcode', 'Code postal')->setMaxLength(5),
            ChoiceField::new('roles', 'Fonction(s)')->setChoices($roles)->allowMultipleChoices()->renderExpanded(),
            ColorField::new('color', 'Couleur')->setRequired(true),
        ];
    }
    
    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if(!$entityInstance instanceof User) return;
        
        $faker = Factory::create('fr_FR');
        
        $entityInstance->setPassword($faker->password(8,8));
        $entityInstance->setPlainPassword($entityInstance->getPassword());
        $password = $this->encoder->hashPassword($entityInstance, $entityInstance->getPassword());
        $entityInstance->setPassword($password);
        
        $email = $this->mailerController->emailRegistration($entityInstance);
        $loader = new FilesystemLoader('C:\Users\Melissa\git\ProjetCapou\ProjetCapou\templates');
        $twig = new Environment($loader);
        
        $renderer = new BodyRenderer($twig);
        $renderer->render($email);
        $this->mailerController->emailSend($email);
        
        $entityManager->persist($entityInstance);
        $entityManager->flush();
        
        $this->logger->info("Un administrateur vient d'ajouter un nouvel utilisateur ");
        
    }    
    
//     public function createEntity(string $entityFqcn):void
//     {
//         $this->logger->info("Un administrateur vient d'ajouter un nouvel utilisateur ");
//     }

    public function updateEntity($entityManager, $entityInstance):void
    {
        $this->logger->info("Un administrateur vient de modifier un utilisateur ");
        $entityManager->persist($entityInstance);
        $entityManager->flush();
    }
    
    public function deleteEntity($entityManager, $entityInstance):void
    {
        $this->logger->info("Un administrateur vient de supprimmer un utilisateur ");
        $entityManager->remove($entityInstance);
        $entityManager->flush();
    }
    
}
