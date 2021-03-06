<?php

namespace App\Repository;

use App\Entity\Sales;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Sales|null find($id, $lockMode = null, $lockVersion = null)
 * @method Sales|null findOneBy(array $criteria, array $orderBy = null)
 * @method Sales[]    findAll()
 * @method Sales[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SalesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Sales::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(Sales $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(Sales $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
    * @return Sales[] Returns an array of Sales objects
    */
    
    public function salesByMonth($value,$startDate)
    {
        $startDate = $startDate->setTime(0, 0, 0);
        $endDate = $startDate->modify('last day of this month')->setTime(23, 59, 59);
        $qb = $this->createQueryBuilder('s')
            ->andWhere('s.User = :val')
            ->setParameter('end', $endDate)
            ->setParameter('start', $startDate)
            ->andWhere('s.CreatedAt >= :start')
            ->andWhere('s.CreatedAt <= :end')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC');
            $result = $qb->getQuery()->getResult();
            return $result;
        ;
    }
    
     /**
    * @return Sales[] Returns an array of Sales objects
    */
    
    public function salesByDay($value,$startDate)
    {
        $startDate = $startDate->setTime(0, 0, 0);
        $endDate = $startDate->setTime(23, 59, 59);
        $qb = $this->createQueryBuilder('s')
            ->andWhere('s.User = :val')
            ->setParameter('end', $endDate)
            ->setParameter('start', $startDate)
            ->andWhere('s.CreatedAt >= :start')
            ->andWhere('s.CreatedAt <= :end')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC');
            $result = $qb->getQuery()->getResult();
            return $result;
        ;
    }
    

    /*
    public function findOneBySomeField($value): ?Sales
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */


}
