<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[ApiResource]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Phrase::class)]
    private $phrase;

    public function __construct()
    {
        $this->phrase = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Phrase>
     */
    public function getPhrase(): Collection
    {
        return $this->phrase;
    }

    public function addPhrase(Phrase $phrase): self
    {
        if (!$this->phrase->contains($phrase)) {
            $this->phrase[] = $phrase;
            $phrase->setCategory($this);
        }

        return $this;
    }

    public function removePhrase(Phrase $phrase): self
    {
        if ($this->phrase->removeElement($phrase)) {
            // set the owning side to null (unless already changed)
            if ($phrase->getCategory() === $this) {
                $phrase->setCategory(null);
            }
        }

        return $this;
    }
}
