<?php

namespace App\Repository;

use App\Entity\Valve;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Valve|null find($id, $lockMode = null, $lockVersion = null)
 * @method Valve|null findOneBy(array $criteria, array $orderBy = null)
 * @method Valve[]    findAll()
 * @method Valve[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ValveRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Valve::class);
    }

    // /**
    //  * @return Valve[] Returns an array of Valve objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('v.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Valve
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
