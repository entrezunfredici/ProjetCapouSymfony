<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $passwordEncoder;
    
    public function __construct(UserPasswordHasherInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }
    
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        
        $adminUser = new User();
        $adminUser->setEmail('admin@test.fr')
                  ->setRoles(array('ROLE_ADMIN'))
                  ->setLastName('admin')
                  ->setFirstName('admin')
                  ->setPhoneNumber($faker->phoneNumber)
                  ->setAddress($faker->address)
                  ->setZipcode($faker->postcode)
                  ->setCity($faker->city)
                  ->setPassword($this->passwordEncoder->hashPassword($adminUser, 'admin'));

        $manager->persist($adminUser);
        $manager->flush();
    }
}
