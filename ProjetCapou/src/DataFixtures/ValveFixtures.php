<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Valve;
use Faker;

class ValveFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        
        $faker = Faker\Factory::create('fr_FR');

        $valve = new Valve();
        $valve->setState($faker->boolean);

        $manager->persist($valve);

        $manager->flush();
    }
}
