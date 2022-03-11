<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Card;
use App\Entity\State;
use Faker;

class CardFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');
        
        for($carte = 0 ; $carte <= 8 ; $carte ++){
            $state = new State();
            $state->setDescription($faker->text(10));
            
            $manager->persist($state);
            
            $card = new Card();
            $card->setLora($faker->randomDigit());
            $card->setDate($faker->date);
            $card->setLocation($faker->longitude.$faker->latitude);
            $card->setFunction($faker->text(7));
            $card->setState($state);
            
            $manager->persist($card);
        }

        
        $manager->flush();
    }
}
