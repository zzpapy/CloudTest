<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private $email;

    #[ORM\Column(type: 'json')]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\OneToMany(mappedBy: 'User', targetEntity: Sales::class)]
    private $sales;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Phrase::class)]
    private $phrases;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Phrase::class)]
    private $phrase1;

    public function __construct()
    {
        $this->sales = new ArrayCollection();
        $this->phrases = new ArrayCollection();
        $this->phrase1 = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Sales>
     */
    public function getSales(): Collection
    {
        return $this->sales;
    }

    public function addSale(Sales $sale): self
    {
        if (!$this->sales->contains($sale)) {
            $this->sales[] = $sale;
            $sale->setUser($this);
        }

        return $this;
    }

    public function removeSale(Sales $sale): self
    {
        if ($this->sales->removeElement($sale)) {
            // set the owning side to null (unless already changed)
            if ($sale->getUser() === $this) {
                $sale->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Phrase>
     */
    public function getPhrases(): Collection
    {
        return $this->phrases;
    }

    public function addPhrase(Phrase $phrase): self
    {
        if (!$this->phrases->contains($phrase)) {
            $this->phrases[] = $phrase;
            $phrase->setUser($this);
        }

        return $this;
    }

    public function removePhrase(Phrase $phrase): self
    {
        if ($this->phrases->removeElement($phrase)) {
            // set the owning side to null (unless already changed)
            if ($phrase->getUser() === $this) {
                $phrase->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Phrase>
     */
    public function getPhrase1(): Collection
    {
        return $this->phrase1;
    }

    public function addPhrase1(Phrase $phrase1): self
    {
        if (!$this->phrase1->contains($phrase1)) {
            $this->phrase1[] = $phrase1;
            $phrase1->setUser($this);
        }

        return $this;
    }

    public function removePhrase1(Phrase $phrase1): self
    {
        if ($this->phrase1->removeElement($phrase1)) {
            // set the owning side to null (unless already changed)
            if ($phrase1->getUser() === $this) {
                $phrase1->setUser(null);
            }
        }

        return $this;
    }
}
