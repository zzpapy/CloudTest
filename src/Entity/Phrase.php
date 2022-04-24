<?php

namespace App\Entity;
use App\Entity\User;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PhraseRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Form\AbstractType;

#[ORM\Entity(repositoryClass: PhraseRepository::class)]
#[ApiResource]
class Phrase
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column( nullable:true)]
    private $category;

    #[ORM\Column(type: 'text')]
    private $Texte;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'phrase1')]
    #[ORM\JoinColumn(nullable: false)]
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCategory()
    {
        return $this->category;
    }

    public function setCategory($category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getTexte(): ?string
    {
        return $this->Texte;
    }

    public function setTexte(string $Texte): self
    {
        $this->Texte = $Texte;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
