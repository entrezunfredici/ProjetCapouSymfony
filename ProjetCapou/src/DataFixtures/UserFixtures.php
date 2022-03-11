<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;
use App\Entity\Profile;
use Faker;
use Faker\Factory;

class UserFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $passwordEncoder){
        
    }
    
    public function load(ObjectManager $manager): void
    {
        $profileAdmin = new Profile();
        $profileAdmin->setName('admin');
        $manager->persist($profileAdmin);
        
        $admin = new User();
        $admin->setEmail('admin@test.fr');
        $admin->setLastname('admin');
        $admin->setFirstname('admin');
        $admin->setUserId('admin');
        $admin->setPassword($this->passwordEncoder->hashPassword($admin, 'admin'));
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setProfile($profileAdmin);
        $manager->persist($admin);
        
        $faker = Faker\Factory::create('fr_FR');
        
        $profileTechnician = new Profile();
        $profileTechnician->setName('technician');
        $manager->persist($profileTechnician);
        
        for($technicien = 1; $technicien <=3 ; $technicien++){
            $technician = new User();
            $technician->setEmail($faker->email);
            $technician->setLastname($faker->lastName);
            $technician->setFirstname($faker->firstName);
            $technician->setUserId($faker->userName);
            $technician->setPassword($this->passwordEncoder->hashPassword($technician, 'technician'));
            $technician->setRoles(['ROLE_TECHNICIAN']);
            $technician->setProfile($profileTechnician);
            $manager->persist($technician);
        }
        
        $profileUser = new Profile();
        $profileUser->setName('user');
        $manager->persist($profileUser);
        
        for($usr = 1; $usr <=3 ;$usr ++){
            $user = new User();
            $user->setEmail($faker->email);
            $user->setLastname($faker->lastName);
            $user->setFirstname($faker->firstName);
            $user->setUserId($faker->userName);
            $user->setPassword($this->passwordEncoder->hashPassword($user, 'user'));
            $user->setRoles(['ROLE_USER']);
            $user->setProfile($profileUser);
            $manager->persist($user);
            
//             $profile = $this->getReference(''. rand(2, 3));
//             $user->setProfile($profile);
                        
        }

        $manager->flush();
    }
}
