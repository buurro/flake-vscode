import {
    HoverProvider,
    TextDocument,
    Position,
    CancellationToken,
    Hover,
    languages,
    ExtensionContext,
    Range,
} from "vscode";

interface MockHover {
    start: Position;
    end: Position;
}

const python3Package: MockHover = {
    start: new Position(28, 23),
    end: new Position(28, 28),
};

class GoHoverProvider implements HoverProvider {
    public provideHover(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): Thenable<Hover> {
        return new Promise((resolve, reject) => {
            const wordRange = document.getWordRangeAtPosition(position);
            console.log([wordRange?.start, wordRange?.end]);

            if (
                wordRange?.contains(
                    new Range(python3Package.start, python3Package.end)
                )
            ) {
                const word = document.getText(wordRange);
                const hover = new Hover(`**${word}**`);

                resolve(hover);
            }
        });
    }
}

export function activate(ctx: ExtensionContext): void {
    ctx.subscriptions.push(
        languages.registerHoverProvider("nix", new GoHoverProvider())
    );
}

export function deactivate() {}
