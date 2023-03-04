{
  description = "Not a fluke";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    stable.url = "github:NixOS/nixpkgs/22.11";
  };

  shame = someParam:
    let
      someVar = 3;
    in
    {
      some = someVar + someParam;
    };

  # mmmmmh
  outputs = { self, nixpkgs, stable }:
    let
      system = "x86_64-darwin";
      pkgs = nixpkgs.legacyPackages.${system};
      stablePkgs = stable.legacyPackages.${system};
    in
    {
      packages.${system} = {
        hellooo = pkgs.hello;
        default = self.packages.${system}.hellooo;

        python = pkgs.python3;
        stablePython = stablePkgs.python3;
      };

      devShell.${system} = pkgs.mkShell {
        packages = [ pkgs.php ];
      };
    };
}
