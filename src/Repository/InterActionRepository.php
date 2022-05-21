<?php

namespace App\Repository;

use App\Entity\InterAction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry; 

/**
 * @method InterAction|null find($id, $lockMode = null, $lockVersion = null)
 * @method InterAction|null findOneBy(array $criteria, array $orderBy = null)
 * @method InterAction[]    findAll()
 * @method InterAction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InterActionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, InterAction::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(InterAction $entity, bool $flush = true): void
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
    public function remove(InterAction $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    public function actions($value)
    {
        $qb = $this->createQueryBuilder('s')
            ->andWhere('s.user = :val')
            ->setParameter('val', $value);
            // ->orderBy('s.id', 'ASC');
            $result = $qb->getQuery()->getResult();
            return $result;
        ;
    }
    /**
     * @return InterAction[] Returns an array of InterAction objects
     */
    
    public function findByUserId($value,$date)
    {
        $startDate = $date->setTime(0, 0, 0);
        $endDate = $date->setTime(23, 59, 59);
        return $this->createQueryBuilder('i')
            ->andWhere('i.user = :val')
            ->setParameter('val', $value)
            ->setParameter('end', $endDate)
            ->setParameter('start', $startDate)
            ->andWhere('i.CreatedAt >= :start')
            ->andWhere('i.CreatedAt <= :end')
            ->orderBy('i.id', 'ASC')
            // ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    

    
    public function findOneBySomeField($value): ?InterAction
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

}
